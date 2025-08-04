import { z } from 'zod/v4';
import { describe, expect, test, jest } from '@jest/globals';
import { TRIP_VEHICLE, VEHICLE_TICKETS_PRICES } from '../../../src/domain/entities/trip.model';
import { UserCardBalanceModelSchema } from '../../../src/domain/entities/user-card-balance.model';

jest.mock('../../../src/domain/entities/trip.model', () => ({
  TRIP_VEHICLE: {
    enum: {
      BUS: 'BUS',
      SUBWAY: 'SUBWAY',
    },
  },
  VEHICLE_TICKETS_PRICES: {
    BUS: 4.4, 
    SUBWAY: 4.4, 
  },
}));

describe('UserCardBalanceModelSchema', () => {
  test('should validate a correct UserCardBalance object with transformation', () => {
    const inputData = {
      currentBalance: 8.8,
      createdAt: '2025-08-04T10:24:00.000-03:00',
      updatedAt: '2025-08-04T10:24:00.000-03:00',
    };

    const expectedOutput = {
      currentBalance: 8.8,
      remainingBusTickets: 8.8 / VEHICLE_TICKETS_PRICES[TRIP_VEHICLE.enum.BUS], 
      remainingSubwayTickets: 8.8 / VEHICLE_TICKETS_PRICES[TRIP_VEHICLE.enum.SUBWAY], 
      createdAt: '2025-08-04T10:24:00.000-03:00',
      updatedAt: '2025-08-04T10:24:00.000-03:00',
    };

    const result = UserCardBalanceModelSchema.parse(inputData);
    expect(result).toEqual(expectedOutput);
  });

  test('should validate a UserCardBalance object with default values', () => {
    const inputData = {
      createdAt: '2025-08-04T10:24:00.000-03:00',
      updatedAt: '2025-08-04T10:24:00.000-03:00',
    };

    const expectedOutput = {
      currentBalance: 0,
      remainingBusTickets: 0,
      remainingSubwayTickets: 0,
      createdAt: '2025-08-04T10:24:00.000-03:00',
      updatedAt: '2025-08-04T10:24:00.000-03:00',
    };

    const result = UserCardBalanceModelSchema.parse(inputData);
    expect(result).toEqual(expectedOutput);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      currentBalance: 8.8,
      // createdAt, updatedAt ausentes
    };

    expect(() => UserCardBalanceModelSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      currentBalance: '8.8', 
      remainingBusTickets: '2', 
      remainingSubwayTickets: '2', 
      createdAt: 123, 
      updatedAt: 456, 
    };

    expect(() => UserCardBalanceModelSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for negative currentBalance', () => {
    const invalidData = {
      currentBalance: -8.8,
      remainingBusTickets: 2,
      remainingSubwayTickets: 2,
      createdAt: '2025-08-04T10:24:00.000-03:00',
      updatedAt: '2025-08-04T10:24:00.000-03:00',
    };

    expect(() => UserCardBalanceModelSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for negative remainingBusTickets', () => {
    const invalidData = {
      currentBalance: 8.8,
      remainingBusTickets: -2,
      remainingSubwayTickets: 2,
      createdAt: '2025-08-04T10:24:00.000-03:00',
      updatedAt: '2025-08-04T10:24:00.000-03:00',
    };

    expect(() => UserCardBalanceModelSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for negative remainingSubwayTickets', () => {
    const invalidData = {
      currentBalance: 8.8,
      remainingBusTickets: 2,
      remainingSubwayTickets: -2,
      createdAt: '2025-08-04T10:24:00.000-03:00',
      updatedAt: '2025-08-04T10:24:00.000-03:00',
    };

    expect(() => UserCardBalanceModelSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should correctly transform remaining tickets based on currentBalance', () => {
    const inputData = {
      currentBalance: 17.6,
      remainingBusTickets: 0, 
      remainingSubwayTickets: 0, 
      createdAt: '2025-08-04T10:24:00.000-03:00',
      updatedAt: '2025-08-04T10:24:00.000-03:00',
    };

    const expectedOutput = {
      currentBalance: 17.6,
      remainingBusTickets: 17.6 / VEHICLE_TICKETS_PRICES[TRIP_VEHICLE.enum.BUS], // 17.6 / 4.4 = 4
      remainingSubwayTickets: 17.6 / VEHICLE_TICKETS_PRICES[TRIP_VEHICLE.enum.SUBWAY], // 17.6 / 4.4 = 4
      createdAt: '2025-08-04T10:24:00.000-03:00',
      updatedAt: '2025-08-04T10:24:00.000-03:00',
    };

    const result = UserCardBalanceModelSchema.parse(inputData);
    expect(result).toEqual(expectedOutput);
  });
});