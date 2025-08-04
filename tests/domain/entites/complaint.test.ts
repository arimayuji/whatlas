import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { ComplaintModel } from '../../../src/domain/entities/complaint.model';

describe('ComplaintModel', () => {
  test('should validate a correct Complaint object', () => {
    const validData = {
      id: 'complaint_123',
      text: 'Service delay at station',
      subjectType: 'terminal_metro',
      subjectId: 'station_456',
      createdAt: '2025-08-04T09:31:00.000Z',
      upVotes: 10,
      downVotes: 5,
    };

    const result = ComplaintModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate a Complaint object with default values', () => {
    const inputData = {
      id: 'complaint_123',
      text: 'Service delay at station',
      subjectType: 'terminal_metro',
      subjectId: 'station_456',
    };

    const result = ComplaintModel.parse(inputData);
    expect(result).toEqual({
      ...inputData,
      createdAt: expect.any(String), // createdAt é preenchido com a data atual
      upVotes: 0,
      downVotes: 0,
    });
    expect(new Date(result.createdAt).toISOString()).toBe(result.createdAt);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      id: 'complaint_123',
    };

    expect(() => ComplaintModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      id: 123, 
      text: 'Service delay at station',
      subjectType: 'invalid_type', 
      subjectId: 456, 
      createdAt: 123, 
      upVotes: '10', 
      downVotes: -5, 
    };

    expect(() => ComplaintModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for empty text', () => {
    const invalidData = {
      id: 'complaint_123',
      text: '',
      subjectType: 'terminal_metro',
      subjectId: 'station_456',
      createdAt: '2025-08-04T09:31:00.000Z',
      upVotes: 0,
      downVotes: 0,
    };

    expect(() => ComplaintModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for text exceeding max length', () => {
    const invalidData = {
      id: 'complaint_123',
      text: 'a'.repeat(257), 
      subjectType: 'terminal_metro',
      subjectId: 'station_456',
      createdAt: '2025-08-04T09:31:00.000Z',
      upVotes: 0,
      downVotes: 0,
    };

    expect(() => ComplaintModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for negative upVotes', () => {
    const invalidData = {
      id: 'complaint_123',
      text: 'Service delay at station',
      subjectType: 'terminal_metro',
      subjectId: 'station_456',
      createdAt: '2025-08-04T09:31:00.000Z',
      upVotes: -1,
      downVotes: 0,
    };

    expect(() => ComplaintModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for negative downVotes', () => {
    const invalidData = {
      id: 'complaint_123',
      text: 'Service delay at station',
      subjectType: 'terminal_metro',
      subjectId: 'station_456',
      createdAt: '2025-08-04T09:31:00.000Z',
      upVotes: 0,
      downVotes: -1,
    };

    expect(() => ComplaintModel.parse(invalidData)).toThrow(z.ZodError);
  });
});