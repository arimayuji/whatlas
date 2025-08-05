import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { LineETAModel, VehicleETAModel, VehicleLineETAModel } from '../../../src/domain/entities/sptrans-eta-line.model';

describe('VehicleETAModel', () => {
  test('should validate a correct VehicleETA object', () => {
    const validData = {
      p: 'VEH123', // Prefixo do veículo
      t: '09:45:00', // Horário de chegada estimado
      a: true, // Acessibilidade
      ta: '2025-08-04T09:30:00.000Z', // Horário da captura
      px: -46.6333, // Longitude
      py: -23.5505, // Latitude
    };

    const result = VehicleETAModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      p: 'VEH123',
      // t, a, ta, px, py ausentes
    };

    expect(() => VehicleETAModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      p: 123, // Deve ser string
      t: 945, // Deve ser string
      a: 'true', // Deve ser boolean
      ta: 123, // Deve ser string
      px: 'invalid', // Deve ser number
      py: 'invalid', // Deve ser number
    };

    expect(() => VehicleETAModel.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('LineETAModel', () => {
  test('should validate a correct LineETA object', () => {
    const validData = {
      cp: 1001, // Código da parada
      np: 'Main Station', // Nome da parada
      py: -23.5505, // Latitude
      px: -46.6333, // Longitude
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

    const result = LineETAModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate an empty LineETA vehicles array', () => {
    const validData = {
      cp: 1001,
      np: 'Main Station',
      py: -23.5505,
      px: -46.6333,
      vs: [], // Array vazio é válido
    };

    const result = LineETAModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      cp: 1001,
      // np, py, px, vs ausentes
    };

    expect(() => LineETAModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      cp: '1001', // Deve ser number
      np: 123, // Deve ser string
      py: 'invalid', // Deve ser number
      px: 'invalid', // Deve ser number
      vs: [
        {
          p: 'VEH123',
          t: '09:45:00',
          a: 'true', // Deve ser boolean
          ta: 123, // Deve ser string
          px: -46.6333,
          py: -23.5505,
        },
      ],
    };

    expect(() => LineETAModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for invalid vehicle in array', () => {
    const invalidData = {
      cp: 1001,
      np: 'Main Station',
      py: -23.5505,
      px: -46.6333,
      vs: [
        {
          p: 'VEH123',
          // t, a, ta, px, py ausentes
        },
      ],
    };

    expect(() => LineETAModel.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('VehicleLineETAModel', () => {
  test('should validate a correct VehicleLineETA object', () => {
    const validData = {
      hr: '2025-08-04T09:31:00.000Z', // Horário de referência
      ps: [
        {
          cp: 1001,
          np: 'Main Station',
          py: -23.5505,
          px: -46.6333,
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
        {
          cp: 1002,
          np: 'Downtown Station',
          py: -23.5510,
          px: -46.6340,
          vs: [],
        },
      ],
    };

    const result = VehicleLineETAModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate an empty VehicleLineETA stops array', () => {
    const validData = {
      hr: '2025-08-04T09:31:00.000Z',
      ps: [], // Array vazio é válido
    };

    const result = VehicleLineETAModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      // hr, ps ausentes
    };

    expect(() => VehicleLineETAModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      hr: 123, // Deve ser string
      ps: [
        {
          cp: '1001', // Deve ser number
          np: 123, // Deve ser string
          py: 'invalid', // Deve ser number
          px: -46.6333,
          vs: [
            {
              p: 'VEH123',
              t: 945, // Deve ser string
              a: true,
              ta: '2025-08-04T09:30:00.000Z',
              px: -46.6333,
              py: -23.5505,
            },
          ],
        },
      ],
    };

    expect(() => VehicleLineETAModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for invalid stop in array', () => {
    const invalidData = {
      hr: '2025-08-04T09:31:00.000Z',
      ps: [
        {
          cp: 1001,
          np: 'Main Station',
          py: -23.5505,
          px: -46.6333,
          vs: [],
        },
        {
          cp: 1002,
          // np, py, px, vs ausentes
        },
      ],
    };

    expect(() => VehicleLineETAModel.parse(invalidData)).toThrow(z.ZodError);
  });
});