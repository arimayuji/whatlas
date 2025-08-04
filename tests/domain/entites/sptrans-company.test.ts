import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { SptransCompanyAreaModel, SptransCompanyModel, SptransCompanyResponseModel } from '../../../src/domain/entities/sptrans-company.model';

describe('SptransCompanyModel', () => {
  test('should validate a correct SptransCompany object', () => {
    const validData = {
      a: 1, // Código da área
      c: 101, // Código da empresa
      n: 'Trans Company A', // Nome da empresa
    };

    const result = SptransCompanyModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      a: 1,
      // c, n ausentes
    };

    expect(() => SptransCompanyModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      a: '1', // Deve ser number
      c: '101', // Deve ser number
      n: 123, // Deve ser string
    };

    expect(() => SptransCompanyModel.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('SptransCompanyAreaModel', () => {
  test('should validate a correct SptransCompanyArea object', () => {
    const validData = {
      a: 1, // Código da área
      e: [
        { a: 1, c: 101, n: 'Trans Company A' },
        { a: 1, c: 102, n: 'Trans Company B' },
      ], // Empresas da área
    };

    const result = SptransCompanyAreaModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate an empty SptransCompanyArea array', () => {
    const validData = {
      a: 1,
      e: [], // Array vazio é válido
    };

    const result = SptransCompanyAreaModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      // a, e ausentes
    };

    expect(() => SptransCompanyAreaModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      a: '1', // Deve ser number
      e: [
        { a: '1', c: 101, n: 'Trans Company A' }, // a deve ser number
        { a: 1, c: '102', n: 'Trans Company B' }, // c deve ser number
      ],
    };

    expect(() => SptransCompanyAreaModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for invalid company in array', () => {
    const invalidData = {
      a: 1,
      e: [
        { a: 1, c: 101, n: 'Trans Company A' },
        { a: 1, c: 102 }, // n ausente
      ],
    };

    expect(() => SptransCompanyAreaModel.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('SptransCompanyResponseModel', () => {
  test('should validate a correct SptransCompanyResponse object', () => {
    const validData = {
      hr: '2025-08-04T09:31:00.000Z',
      e: [
        {
          a: 1,
          e: [
            { a: 1, c: 101, n: 'Trans Company A' },
            { a: 1, c: 102, n: 'Trans Company B' },
          ],
        },
        {
          a: 2,
          e: [{ a: 2, c: 201, n: 'Trans Company C' }],
        },
      ],
    };

    const result = SptransCompanyResponseModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate an empty SptransCompanyResponse array', () => {
    const validData = {
      hr: '2025-08-04T09:31:00.000Z',
      e: [], // Array vazio é válido
    };

    const result = SptransCompanyResponseModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      // hr, e ausentes
    };

    expect(() => SptransCompanyResponseModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      hr: 123, // Deve ser string
      e: [
        {
          a: '1', // Deve ser number
          e: [{ a: 1, c: '101', n: 'Trans Company A' }], // c deve ser number
        },
      ],
    };

    expect(() => SptransCompanyResponseModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for invalid area in array', () => {
    const invalidData = {
      hr: '2025-08-04T09:31:00.000Z',
      e: [
        {
          a: 1,
          e: [{ a: 1, c: 101, n: 'Trans Company A' }],
        },
        {
          a: 2,
          // e ausente
        },
      ],
    };

    expect(() => SptransCompanyResponseModel.parse(invalidData)).toThrow(z.ZodError);
  });
});