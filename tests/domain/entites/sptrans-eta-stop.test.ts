import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { LinesStopETAModel, LineVehiclesETAModel, StopETAModel } from '../../../src/domain/entities/sptrans-eta-stop.model';

describe('LineVehiclesETAModel', () => {
  test('should validate a correct LineVehiclesETA object', () => {
    const validData = {
      c: '101A-10', // Letreiro completo
      cl: 101, // Código da linha
      sl: 1, // Sentido de operação
      lt0: 'Terminal A', // Letreiro de destino
      lt1: 'Terminal B', // Letreiro de origem
      qv: 2, // Quantidade de veículos
      vs: [
        {
          p: 'VEH123',
          t: '09:45:00',
          a: true,
          ta: '2025-08-04T09:30:00.000Z',
          px: -46.6333,
          py: -23.5505,
        },
        {
          p: 'VEH124',
          t: '09:50:00',
          a: false,
          ta: '2025-08-04T09:30:00.000Z',
          px: -46.6340,
          py: -23.5510,
        },
      ],
    };

    const result = LineVehiclesETAModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate an empty LineVehiclesETA vehicles array', () => {
    const validData = {
      c: '101A-10',
      cl: 101,
      sl: 1,
      lt0: 'Terminal A',
      lt1: 'Terminal B',
      qv: 0,
      vs: [], 
    };

    const result = LineVehiclesETAModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      c: '101A-10',
    };

    expect(() => LineVehiclesETAModel.parse(invalidData)).toThrow(z.ZodError);
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
          t: '09:45:00',
          a: 'true',
          ta: '2025-08-04T09:30:00.000Z',
          px: -46.6333,
          py: -23.5505,
        },
      ],
    };

    expect(() => LineVehiclesETAModel.parse(invalidData)).toThrow(z.ZodError);
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
        },
      ],
    };

    expect(() => LineVehiclesETAModel.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('StopETAModel', () => {
  test('should validate a correct StopETA object', () => {
    const validData = {
      cp: 1001, // Código da parada
      np: 'Main Station', // Nome da parada
      py: -23.5505, // Latitude
      px: -46.6333, // Longitude
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
              p: 'VEH123',
              t: '09:45:00',
              a: true,
              ta: '2025-08-04T09:30:00.000Z',
              px: -46.6333,
              py: -23.5505,
            },
          ],
        },
      ],
    };

    const result = StopETAModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate an empty StopETA lines array', () => {
    const validData = {
      cp: 1001,
      np: 'Main Station',
      py: -23.5505,
      px: -46.6333,
      l: [], // Array vazio é válido
    };

    const result = StopETAModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      cp: 1001,
    };

    expect(() => StopETAModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      cp: '1001',
      np: 123, 
      py: 'invalid',
      px: 'invalid',
      l: [
        {
          c: 101, 
          cl: '101',
          sl: '1',
          lt0: 'Terminal A',
          lt1: 'Terminal B',
          qv: '1',
          vs: [],
        },
      ],
    };

    expect(() => StopETAModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for invalid line in array', () => {
    const invalidData = {
      cp: 1001,
      np: 'Main Station',
      py: -23.5505,
      px: -46.6333,
      l: [
        {
          c: '101A-10',
        },
      ],
    };

    expect(() => StopETAModel.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('LinesStopETAModel', () => {
  test('should validate a correct LinesStopETA object', () => {
    const validData = {
      hr: '2025-08-04T09:31:00.000Z', // Horário de referência
      p: {
        cp: 1001,
        np: 'Main Station',
        py: -23.5505,
        px: -46.6333,
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
                p: 'VEH123',
                t: '09:45:00',
                a: true,
                ta: '2025-08-04T09:30:00.000Z',
                px: -46.6333,
                py: -23.5505,
              },
            ],
          },
        ],
      },
    };

    const result = LinesStopETAModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
    };

    expect(() => LinesStopETAModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      hr: 123, 
      p: {
        cp: '1001', 
        np: 123, 
        py: 'invalid', 
        px: -46.6333,
        l: [
          {
            c: '101A-10',
            cl: '101', 
            sl: 1,
            lt0: 'Terminal A',
            lt1: 'Terminal B',
            qv: 1,
            vs: [],
          },
        ],
      },
    };

    expect(() => LinesStopETAModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for invalid stop', () => {
    const invalidData = {
      hr: '2025-08-04T09:31:00.000Z',
      p: {
        cp: 1001,
      },
    };

    expect(() => LinesStopETAModel.parse(invalidData)).toThrow(z.ZodError);
  });
});