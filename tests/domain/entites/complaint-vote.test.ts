// src/domain/entities/__tests__/complaint-vote.test.js
import { z } from 'zod/v4';
import { ComplaintVoteModel } from '../../../src/domain/entities/complaint-vote.model';
import { describe, expect, test } from '@jest/globals';

describe('ComplaintVoteModel', () => {
  test('should validate a correct ComplaintVote object', () => {
    const validData = {
      id: 'vote_123',
      complaintId: 'complaint_456',
      userId: 'user_789',
      vote_type: 'up',
    };

    const result = ComplaintVoteModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw error for invalid vote_type', () => {
    const invalidData = {
      id: 'vote_123',
      complaintId: 'complaint_456',
      userId: 'user_789',
      vote_type: 'invalid', 
    };

    expect(() => ComplaintVoteModel.parse(invalidData)).toThrow(
      z.ZodError
    );
  });

  test('should throw error for missing required fields', () => {
    const invalidData = {
      id: 'vote_123',
      complaintId: 'complaint_456',
    };

    expect(() => ComplaintVoteModel.parse(invalidData)).toThrow(
      z.ZodError
    );
  });

  // Teste 4: Rejeitar objeto com tipos incorretos
  test('should throw error for incorrect field types', () => {
    const invalidData = {
      id: 123, // Deve ser string
      complaintId: 'complaint_456',
      userId: 'user_789',
      vote_type: 'up',
    };

    expect(() => ComplaintVoteModel.parse(invalidData)).toThrow(
      z.ZodError
    );
  });

});