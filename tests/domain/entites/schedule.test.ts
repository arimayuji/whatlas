import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { ScheduleModel } from '../../../src/domain/entities/schedule.model';

describe('ScheduleModel', () => {
  test('should validate a correct Schedule object', () => {
    const validData = {
      id: 'schedule_123',
      date: '2025-08-04',
      time: '09:30:00',
      origin: {
        label: 'Main Station',
        latitude: '-23.5505',
        longitude: '-46.6333',
      },
      destination: {
        label: 'Downtown Station',
        latitude: '-23.5510',
        longitude: '-46.6340',
      },
      calculatedDepartureTime: '09:45:00',
      notificationSent: true,
      createdAt: '2025-08-04T09:31:00.000Z',
      updatedAt: '2025-08-04T09:31:00.000Z',
    };

    const result = ScheduleModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate a Schedule object with default values', () => {
    const inputData = {
      id: 'schedule_123',
      date: '2025-08-04',
      time: '09:30:00',
      origin: {
        label: 'Main Station',
        latitude: '-23.5505',
        longitude: '-46.6333',
      },
      destination: {
        label: 'Downtown Station',
        latitude: '-23.5510',
        longitude: '-46.6340',
      },
      createdAt: '2025-08-04T09:31:00.000Z',
      updatedAt: '2025-08-04T09:31:00.000Z',
    };

    const result = ScheduleModel.parse(inputData);
    expect(result).toEqual({
      ...inputData,
      notificationSent: false, 
    });
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      id: 'schedule_123',
    };

    expect(() => ScheduleModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      id: 123, 
      date: 20250804, 
      time: 930, 
      origin: {
        label: 'Main Station',
        latitude: -23.5505, 
        longitude: '-46.6333',
      },
      destination: {
        label: 'Downtown Station',
        latitude: '-23.5510',
        longitude: -46.6340, 
      },
      calculatedDepartureTime: 945, 
      notificationSent: 'true', 
      createdAt: '2025-08-04T09:31:00.000Z',
      updatedAt: '2025-08-04T09:31:00.000Z',
    };

    expect(() => ScheduleModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for invalid origin', () => {
    const invalidData = {
      id: 'schedule_123',
      date: '2025-08-04',
      time: '09:30:00',
      origin: {
        label: 'Main Station',
      },
      destination: {
        label: 'Downtown Station',
        latitude: '-23.5510',
        longitude: '-46.6340',
      },
      createdAt: '2025-08-04T09:31:00.000Z',
      updatedAt: '2025-08-04T09:31:00.000Z',
    };

    expect(() => ScheduleModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for invalid destination', () => {
    const invalidData = {
      id: 'schedule_123',
      date: '2025-08-04',
      time: '09:30:00',
      origin: {
        label: 'Main Station',
        latitude: '-23.5505',
        longitude: '-46.6333',
      },
      destination: {
        label: 'Downtown Station',
        latitude: -23.5510, 
        longitude: '-46.6340',
      },
      createdAt: '2025-08-04T09:31:00.000Z',
      updatedAt: '2025-08-04T09:31:00.000Z',
    };

    expect(() => ScheduleModel.parse(invalidData)).toThrow(z.ZodError);
  });
});