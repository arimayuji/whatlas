import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { LocationModel } from '../../../src/domain/entities/location.model';

describe('LocationModel', () => {
  test('should validate a correct Location object', () => {
    const validData = {
      label: 'Main Station',
      latitude: '-23.5505',
      longitude: '-46.6333',
    };

    const result = LocationModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      label: 'Main Station',
      // latitude, longitude ausentes
    };

    expect(() => LocationModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      label: 123,
      latitude: 23.5505,
      longitude: -46.6333, 
    };

    expect(() => LocationModel.parse(invalidData)).toThrow(z.ZodError);
  });
});