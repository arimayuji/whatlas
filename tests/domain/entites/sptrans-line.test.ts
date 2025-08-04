import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { SpTransLineModel, SpTransLinesModel } from '../../../src/domain/entities/sptrans-line.model';

describe('SpTransLineModel', () => {
  test('should validate a correct SpTransLine object', () => {
    const validData = {
      cl: 101, // Código da linha
      lc: false, // Modo circular
      lt: '101A', // Primeira parte do letreiro
      sl: 1, // Sentido de operação
      tl: 10, // Segunda parte do letreiro
      tp: 'Terminal Principal', // Letreiro descritivo (Principal -> Secundário)
      ts: 'Terminal Secundário', // Letreiro descritivo (Secundário -> Principal)
    };

    const result = SpTransLineModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      cl: 101,
    };

    expect(() => SpTransLineModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      cl: '101',
      lc: 'false', 
      lt: 101, 
      sl: '1',
      tl: '10',
      tp: 123, 
      ts: 456, 
    };

    expect(() => SpTransLineModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for non-integer sl', () => {
    const invalidData = {
      cl: 101,
      lc: false,
      lt: '101A',
      sl: 1.5,
      tl: 10,
      tp: 'Terminal Principal',
      ts: 'Terminal Secundário',
    };

    expect(() => SpTransLineModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for non-integer tl', () => {
    const invalidData = {
      cl: 101,
      lc: false,
      lt: '101A',
      sl: 1,
      tl: 10.5,
      tp: 'Terminal Principal',
      ts: 'Terminal Secundário',
    };

    expect(() => SpTransLineModel.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('SpTransLinesModel', () => {
  test('should validate a correct SpTransLines array', () => {
    const validData = [
      {
        cl: 101,
        lc: false,
        lt: '101A',
        sl: 1,
        tl: 10,
        tp: 'Terminal Principal',
        ts: 'Terminal Secundário',
      },
      {
        cl: 102,
        lc: true,
        lt: '102B',
        sl: 2,
        tl: 20,
        tp: 'Terminal Secundário',
        ts: 'Terminal Principal',
      },
    ];

    const result = SpTransLinesModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate an empty SpTransLines array', () => {
    const validData: unknown = [];
    const result = SpTransLinesModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for array with invalid SpTransLine objects', () => {
    const invalidData = [
      {
        cl: 101,
        lc: false,
        lt: '101A',
        sl: 1,
        tl: 10,
        tp: 'Terminal Principal',
        ts: 'Terminal Secundário',
      },
      {
        cl: '102',
        lc: true,
        lt: '102B',
        sl: 2,
        tl: '20',
        tp: 'Terminal Secundário',
        ts: 'Terminal Principal',
      },
    ];

    expect(() => SpTransLinesModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for non-array input', () => {
    const invalidData = {
      cl: 101,
      lc: false,
      lt: '101A',
      sl: 1,
      tl: 10,
      tp: 'Terminal Principal',
      ts: 'Terminal Secundário',
    };

    expect(() => SpTransLinesModel.parse(invalidData)).toThrow(z.ZodError);
  });
});