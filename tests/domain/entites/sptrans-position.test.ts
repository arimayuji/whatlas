import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { LinePositionModel, LinePositionResponseModel } from '../../../src/domain/entities/sptrans-position.model';

describe('LinePositionModel', () => {
  test('should validate a correct LinePosition object', () => {
    const validData = {
      c: '101A-10', // Letreiro completo
      cl: 101, // Código da linha
      sl: 1, // Sentido de operação
      lt0: 'Terminal A', // Letreiro de destino
      lt1: 'Terminal B', // Letreiro de origem
      qv: 2, // Quantidade de veículos
      vs: [
        {
          p: 0,
          a: true,
          ta: '2025-08-04T09:30:00.000Z',
          py: -23.5505,
          px: -46.6333,
        },
        {
          p: 0,
          a: false,
          ta: '2025-08-04T09:30:00.000Z',
          py: -23.5510,
          px: -46.6340,
        },
      ],
    };

    const result = LinePositionModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate an empty LinePosition vehicles array', () => {
    const validData = {
      c: '101A-10',
      cl: 101,
      sl: 1,
      lt0: 'Terminal A',
      lt1: 'Terminal B',
      qv: 0,
      vs: [], 
    };

    const result = LinePositionModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      c: '101A-10',
      // cl, sl, lt0, lt1, qv, vs ausentes
    };

    expect(() => LinePositionModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      c: 101,
      cl: '101',
      sl: '1',
      lt0: 123,
      lt1: 456,
      qv: '2',
      vs: [
        {
          p: 123,
          a: 'true', 
          ta: 123,
          py: 'invalid',
          px: 'invalid',
        },
      ],
    };

    expect(() => LinePositionModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for invalid vehicle in array', () => {
    const invalidData = {
      c: '101A-10',
      cl: 101,
      sl: 1,
      lt0: 'Terminal A',
      lt1: 'Terminal B',
      qv: 1,
      vs: [
        {
          p: 'VEH123',
          // a, ta, py, px ausentes
        },
      ],
    };

    expect(() => LinePositionModel.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('LinePositionResponseModel', () => {
  test('should validate a correct LinePositionResponse object', () => {
    const validData = {
      hr: '2025-08-04T09:31:00.000Z', // Horário de referência
      l: [
        {
          c: '101A-10',
          cl: 101,
          sl: 1,
          lt0: 'Terminal A',
          lt1: 'Terminal B',
          qv: 1,
          vs: [
            {
              p: 0,
              a: true,
              ta: '2025-08-04T09:30:00.000Z',
              py: -23.5505,
              px: -46.6333,
            },
          ],
        },
        {
          c: '102B-10',
          cl: 102,
          sl: 2,
          lt0: 'Terminal B',
          lt1: 'Terminal A',
          qv: 0,
          vs: [
             {
              p: 0,
              a: true,
              ta: '2025-08-04T09:30:00.000Z',
              py: -23.5505,
              px: -46.6333,
            },
          ],
        },
      ],
    };

    const result = LinePositionResponseModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate an empty LinePositionResponse lines array', () => {
    const validData = {
      hr: '2025-08-04T09:31:00.000Z',
      l: [], 
    };

    const result = LinePositionResponseModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
    };

    expect(() => LinePositionResponseModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      hr: 123,
      l: [
        {
          c: 101,
          cl: '101',
          sl: '1',
          lt0: 'Terminal A',
          lt1: 'Terminal B',
          qv: '1',
          vs: [
            {
              p: 'VEH123',
              a: 'true', 
              ta: '2025-08-04T09:30:00.000Z',
              py: -23.5505,
              px: -46.6333,
            },
          ],
        },
      ],
    };

    expect(() => LinePositionResponseModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for invalid line in array', () => {
    const invalidData = {
      hr: '2025-08-04T09:31:00.000Z',
      l: [
        {
          c: '101A-10',
          cl: 101,
          sl: 1,
          lt0: 'Terminal A',
          lt1: 'Terminal B',
          qv: 1,
          vs: [],
        },
        {
          c: '102B-10',
        },
      ],
    };

    expect(() => LinePositionResponseModel.parse(invalidData)).toThrow(z.ZodError);
  });
});