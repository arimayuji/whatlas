import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { RechargeModelSchema } from '../../../src/domain/entities/recharge.model';

describe('RechargeModelSchema', () => {
  test('should validate a correct Recharge object', () => {
    const validData = {
      id: 'recharge_123',
      rechargeAmount: 50.0,
      createdAt: '2025-08-04T09:31:00.000Z',
      updatedAt: '2025-08-04T09:31:00.000Z',
    };

    const result = RechargeModelSchema.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      id: 'recharge_123',
      // rechargeAmount, createdAt, updatedAt ausentes
    };

    expect(() => RechargeModelSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      id: 123, 
      rechargeAmount: '50',
      createdAt: 123,
      updatedAt: '2025-08-04T09:31:00.000Z',
    };

    expect(() => RechargeModelSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for negative rechargeAmount', () => {
    const invalidData = {
      id: 'recharge_123',
      rechargeAmount: -10, 
      createdAt: '2025-08-04T09:31:00.000Z',
      updatedAt: '2025-08-04T09:31:00.000Z',
    };

    expect(() => RechargeModelSchema.parse(invalidData)).toThrow(z.ZodError);
  });
});