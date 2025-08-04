import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { SpTransStopModel, SpTransStopResponseModel } from '../../../src/domain/entities/sptrans-stop.model';

describe('SpTransStopModel', () => {
  test('should validate a correct SpTransStop object', () => {
    const validData = {
      cp: 1001, // Código da parada
      np: 'Main Station', // Nome da parada
      ed: 'Av. Principal, 123', // Endereço
      py: -23.5505, // Latitude
      px: -46.6333, // Longitude
    };

    const result = SpTransStopModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      cp: 1001,
    };

    expect(() => SpTransStopModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      cp: '1001', 
      np: 123, 
      ed: 456, 
      py: 'invalid', 
      px: 'invalid', 
    };

    expect(() => SpTransStopModel.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('SpTransStopResponseModel', () => {
  test('should validate a correct SpTransStopResponse array', () => {
    const validData = [
      {
        cp: 1001,
        np: 'Main Station',
        ed: 'Av. Principal, 123',
        py: -23.5505,
        px: -46.6333,
      },
      {
        cp: 1002,
        np: 'Downtown Station',
        ed: 'Rua Secundária, 456',
        py: -23.5510,
        px: -46.6340,
      },
    ];

    const result = SpTransStopResponseModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate an empty SpTransStopResponse array', () => {
    const validData: unknown = [];
    const result = SpTransStopResponseModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for array with invalid SpTransStop objects', () => {
    const invalidData = [
      {
        cp: 1001,
        np: 'Main Station',
        ed: 'Av. Principal, 123',
        py: -23.5505,
        px: -46.6333,
      },
      {
        cp: '1002', 
        np: 123, 
        ed: 'Rua Secundária, 456',
        py: -23.5510,
        px: -46.6340,
      },
    ];

    expect(() => SpTransStopResponseModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for non-array input', () => {
    const invalidData = {
      cp: 1001,
      np: 'Main Station',
      ed: 'Av. Principal, 123',
      py: -23.5505,
      px: -46.6333,
    };

    expect(() => SpTransStopResponseModel.parse(invalidData)).toThrow(z.ZodError);
  });
});