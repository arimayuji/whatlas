import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { BusStopModel, BusStopsModel } from '../../../src/domain/entities/bus-line-stop.model';

describe('BusStopModel', () => {
  test('should validate a correct BusStop object', () => {
    const validData = {
      stop_id: 'stop_123',
      stop_name: 'Main Station',
      stop_lat: -23.5505,
      stop_lon: -46.6333,
      stop_sequence: 1,
      estacao_inicio: 'Terminal A',
      estacao_fim: 'Terminal B',
    };

    const result = BusStopModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      stop_id: 'stop_123',
      stop_name: 'Main Station',
      // stop_lat, stop_lon, stop_sequence, estacao_inicio, estacao_fim ausentes
    };

    expect(() => BusStopModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      stop_id: 123, // Deve ser string
      stop_name: 'Main Station',
      stop_lat: 'invalid', // Deve ser number
      stop_lon: -46.6333,
      stop_sequence: '1', // Deve ser number
      estacao_inicio: 'Terminal A',
      estacao_fim: 'Terminal B',
    };

    expect(() => BusStopModel.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('BusStopsModel', () => {
  test('should validate a correct BusStops array', () => {
    const validData = [
      {
        stop_id: 'stop_123',
        stop_name: 'Main Station',
        stop_lat: -23.5505,
        stop_lon: -46.6333,
        stop_sequence: 1,
        estacao_inicio: 'Terminal A',
        estacao_fim: 'Terminal B',
      },
      {
        stop_id: 'stop_456',
        stop_name: 'Second Station',
        stop_lat: -23.5510,
        stop_lon: -46.6340,
        stop_sequence: 2,
        estacao_inicio: 'Terminal A',
        estacao_fim: 'Terminal B',
      },
    ];

    const result = BusStopsModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate an empty BusStops array', () => {
    const validData: unknown = [];
    const result = BusStopsModel.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for array with invalid BusStop objects', () => {
    const invalidData = [
      {
        stop_id: 'stop_123',
        stop_name: 'Main Station',
        // stop_lat, stop_lon, stop_sequence, estacao_inicio, estacao_fim ausentes
      },
      {
        stop_id: 456, // Deve ser string
        stop_name: 'Second Station',
        stop_lat: -23.5510,
        stop_lon: -46.6340,
        stop_sequence: 2,
        estacao_inicio: 'Terminal A',
        estacao_fim: 'Terminal B',
      },
    ];

    expect(() => BusStopsModel.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for non-array input', () => {
    const invalidData = {
      stop_id: 'stop_123',
      stop_name: 'Main Station',
      stop_lat: -23.5505,
      stop_lon: -46.6333,
      stop_sequence: 1,
      estacao_inicio: 'Terminal A',
      estacao_fim: 'Terminal B',
    };

    expect(() => BusStopsModel.parse(invalidData)).toThrow(z.ZodError);
  });
});