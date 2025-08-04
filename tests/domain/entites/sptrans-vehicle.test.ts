import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { LineVehiclesPositionsModel, SpTransVehicleModel } from '../../../src/domain/entities/sptrans-vehicle.model';

describe('SpTransVehicleModel', () => {
  test('should validate a correct SpTransVehicle object', () => {
    const validData = {
      p: 12345, // Prefixo do veículo
      a: true, // Acessibilidade
      ta: '2025-08-04T10:24:00.000-03:00', // Horário da captura
      py: -23.5505, // Latitude
      px: -46.6333, // Longitude
    };

    const result = SpTransVehicleModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      p: 12345,
    };

    expect(() => SpTransVehicleModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      p: '12345', 
      a: 'true',
      ta: 123, 
      py: 'invalid', 
      px: 'invalid', 
    };

    expect(() => SpTransVehicleModel.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('LineVehiclesPositionsModel', () => {
  test('should validate a correct LineVehiclesPositions object', () => {
    const validData = {
      hr: '2025-08-04T10:24:00.000-03:00', // Horário de referência
      vs: [
        {
          p: 12345,
          a: true,
          ta: '2025-08-04T10:24:00.000-03:00',
          py: -23.5505,
          px: -46.6333,
        },
        {
          p: 12346,
          a: false,
          ta: '2025-08-04T10:24:00.000-03:00',
          py: -23.5510,
          px: -46.6340,
        },
      ],
    };

    const result = LineVehiclesPositionsModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate an empty LineVehiclesPositions vehicles array', () => {
    const validData = {
      hr: '2025-08-04T10:24:00.000-03:00',
      vs: [], 
    };

    const result = LineVehiclesPositionsModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
    };

    expect(() => LineVehiclesPositionsModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      hr: 123, 
      vs: [
        {
          p: '12345', 
          a: true,
          ta: '2025-08-04T10:24:00.000-03:00',
          py: -23.5505,
          px: -46.6333,
        },
      ],
    };

    expect(() => LineVehiclesPositionsModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for invalid vehicle in array', () => {
    const invalidData = {
      hr: '2025-08-04T10:24:00.000-03:00',
      vs: [
        {
          p: 12345,
        },
      ],
    };

    expect(() => LineVehiclesPositionsModel.parse(invalidData)).toThrow(z.ZodError);
  });
});