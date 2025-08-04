import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { SpTransCorredorModel, SpTransCorredorResponseModel } from '../../../src/domain/entities/sptrans-corredor.model';

describe('SpTransCorredorModel', () => {
  test('should validate a correct SpTransCorredor object', () => {
    const validData = {
      cc: 1, // Código do corredor
      nc: 'Corredor Norte-Sul', // Nome do corredor
    };

    const result = SpTransCorredorModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      cc: 1,
    };

    expect(() => SpTransCorredorModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      cc: '1', 
      nc: 123, 
    };

    expect(() => SpTransCorredorModel.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('SpTransCorredorResponseModel', () => {
  test('should validate a correct SpTransCorredorResponse array', () => {
    const validData = [
      { cc: 1, nc: 'Corredor Norte-Sul' },
      { cc: 2, nc: 'Corredor Leste-Oeste' },
    ];

    const result = SpTransCorredorResponseModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate an empty SpTransCorredorResponse array', () => {
    const validData: unknown = [];
    const result = SpTransCorredorResponseModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for array with invalid SpTransCorredor objects', () => {
    const invalidData = [
      { cc: 1, nc: 'Corredor Norte-Sul' },
      { cc: '2', nc: 123 },
    ];

    expect(() => SpTransCorredorResponseModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for non-array input', () => {
    const invalidData = {
      cc: 1,
      nc: 'Corredor Norte-Sul',
    };

    expect(() => SpTransCorredorResponseModel.parse(invalidData)).toThrow(z.ZodError);
  });
});