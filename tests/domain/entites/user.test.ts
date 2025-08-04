import { z } from 'zod/v4';
import { describe, expect, test } from '@jest/globals';
import { CreateUserSchema, GoogleTokensSchema, UserSchema } from '../../../src/domain/entities/user.model';

describe('GoogleTokensSchema', () => {
  test('should validate a correct GoogleTokens object', () => {
    const validData = {
      accessToken: 'access_token_123',
      refreshToken: 'refresh_token_456',
      expiresAt: '2025-08-04T10:24:00.000-03:00',
    };

    const result = GoogleTokensSchema.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      accessToken: 'access_token_123',
    };

    expect(() => GoogleTokensSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      accessToken: 123, 
      refreshToken: 456, 
      expiresAt: 789, 
    };

    expect(() => GoogleTokensSchema.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('UserSchema', () => {
  test('should validate a correct User object with all fields', () => {
    const validData = {
      id: 'user_123',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      defaultOrigin: {
        label: 'Home',
        latitude: '-23.5505',
        longitude: '-46.6333',
      },
      destinations: [
        {
          label: 'Work',
          latitude: '-23.5510',
          longitude: '-46.6340',
        },
      ],
      marginInMinutes: 15,
      googleCalendarConnected: true,
      googleCalendarTokens: {
        accessToken: 'access_token_123',
        refreshToken: 'refresh_token_456',
        expiresAt: '2025-08-04T10:24:00.000-03:00',
      },
      recharges: [
        {
          id: 'recharge_123',
          rechargeAmount: 50,
          date: '2025-08-04',
          createdAt: '2025-08-04T10:24:00.000-03:00',
          updatedAt: '2025-08-04T10:24:00.000-03:00',
        },
      ],
      trips: [
        {
          id: 'trip_123',
          origin: { label: 'Home', latitude: '-23.5505', longitude: '-46.6333' },
          destination: { label: 'Work', latitude: '-23.5510', longitude: '-46.6340' },
          status:"PENDING",
          departureTime: '09:00:00',
          duration: 120,
          steps: [],
          weatherCondition: {
            weatherCondition: {
              condition: 'SUNNY',
              description: {
                en: 'Sunny',
                pt: 'Ensolarado',
              },
              iconBaseUri: 'data:image/png;base64,...',
              type: 'CLEAR',
            },
            temperature: {
              current: 25,
              min: 20,
              max: 30,
              unit: "CELSIUS",
              degrees: 25,
            },
            feelsLikeTemperature: {
              current: 26,
              min: 21,
              max: 31,
              unit: "CELSIUS",
              degrees: 26,
            },
            precipitation: {
              type: 'NONE',
              intensity: 0,
              qpf: {
                quantity: 0,
                unit: 'MM',
              },
              probability: {
                percent: 0,
                type: 'NONE',
                qpf:{}
              },
            }
          },
          arrivalAt: '2025-08-04T10:24:00.000-03:00',
          createdAt: '2025-08-04T10:24:00.000-03:00',
          updatedAt: '2025-08-04T10:24:00.000-03:00',
        },
      ],
      cardBalance: {
        id: 'balance_123',
        balance: 100,
        updatedAt: '2025-08-04T10:24:00.000-03:00',
        createdAt: '2025-08-04T10:24:00.000-03:00',
      },
      arrivalAt: '2025-08-04T10:24:00.000-03:00',
      createdAt: '2025-08-04T10:24:00.000-03:00',
      updatedAt: '2025-08-04T10:24:00.000-03:00',
    };

    const result = UserSchema.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate a User object with default values', () => {
    const inputData = {
      id: 'user_123',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      cardBalance: {
        id: 'balance_123',
        balance: 100,
        createdAt: '2025-08-04T10:24:00.000-03:00',
        updatedAt: '2025-08-04T10:24:00.000-03:00',
      },
      updatesAt: "2025-08-04T10:24:00.000-03:00",
    };

    const result = UserSchema.parse(inputData);
    expect(result).toEqual({
      ...inputData,
      defaultOrigin: null,
      destinations: [],
      marginInMinutes: 10,
      googleCalendarConnected: false,
      googleCalendarTokens: null,
      recharges: [],
      trips: [],
      createdAt: expect.any(String),
      updatedAt: null,
    });
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      id: 'user_123',
    };

    expect(() => UserSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for empty required strings', () => {
    const invalidData = {
      id: 'user_123',
      firstName: '',
      lastName: '',
      username: '',
      cardBalance: {
        id: 'balance_123',
        balance: 100,
        updatedAt: '2025-08-04T10:24:00.000-03:00',
      },
    };

    expect(() => UserSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      id: 123, 
      firstName: 123, 
      lastName: 456, 
      username: 789, 
      defaultOrigin: {
        label: 123, 
        latitude: -23.5505, 
        longitude: '-46.6333',
      },
      destinations: [
        {
          label: 'Work',
          latitude: -23.5510, 
          longitude: '-46.6340',
        },
      ],
      marginInMinutes: '15', 
      googleCalendarConnected: 'true', 
      googleCalendarTokens: {
        accessToken: 123, 
        refreshToken: 'refresh_token_456',
        expiresAt: '2025-08-04T10:24:00.000-03:00',
      },
      recharges: [
        {
          id: 123, 
          amount: '50', 
          date: '2025-08-04',
          createdAt: '2025-08-04T10:24:00.000-03:00',
          updatedAt: '2025-08-04T10:24:00.000-03:00',
        },
      ],
      trips: [
        {
          id: 'trip_123',
          origin: { label: 'Home', latitude: '-23.5505', longitude: '-46.6333' },
          destination: { label: 'Work', latitude: '-23.5510', longitude: -46.6340 }, 
          departureTime: 900, 
          createdAt: '2025-08-04T10:24:00.000-03:00',
          updatedAt: '2025-08-04T10:24:00.000-03:00',
        },
      ],
      cardBalance: {
        id: 123, 
        balance: '100', 
        updatedAt: '2025-08-04T10:24:00.000-03:00',
      },
      createdAt: 123, 
      updatedAt: 456, 
    };

    expect(() => UserSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for invalid defaultOrigin', () => {
    const invalidData = {
      id: 'user_123',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      defaultOrigin: {
        label: 'Home',
      },
      cardBalance: {
        id: 'balance_123',
        balance: 100,
        updatedAt: '2025-08-04T10:24:00.000-03:00',
      },
    };

    expect(() => UserSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for invalid destination in array', () => {
    const invalidData = {
      id: 'user_123',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      destinations: [
        {
          label: 'Work',
          latitude: -23.5510, 
          longitude: '-46.6340',
        },
      ],
      cardBalance: {
        id: 'balance_123',
        balance: 100,
        updatedAt: '2025-08-04T10:24:00.000-03:00',
      },
    };

    expect(() => UserSchema.parse(invalidData)).toThrow(z.ZodError);
  });
});

describe('CreateUserSchema', () => {
  test('should validate a correct CreateUser object with all fields', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      defaultOrigin: {
        label: 'Home',
        latitude: '-23.5505',
        longitude: '-46.6333',
      },
      destinations: [
        {
          label: 'Work',
          latitude: '-23.5510',
          longitude: '-46.6340',
        },
      ],
      marginInMinutes: 15,
      googleCalendarConnected: true,
      googleCalendarTokens: {
        accessToken: 'access_token_123',
        refreshToken: 'refresh_token_456',
        expiresAt: '2025-08-04T10:24:00.000-03:00',
      },
      recharges: [
        {
          id: 'recharge_123',
          amount: 50,
          date: '2025-08-04',
          createdAt: '2025-08-04T10:24:00.000-03:00',
          updatedAt: '2025-08-04T10:24:00.000-03:00',
          rechargeAmount: 50,
        },
      ],
      trips: [
        {
          id: 'trip_123',
          steps: [],
          status: "PENDING",
          duartion: 120,
          weatherCondition: {
            weatherCondition: {
              condition: 'SUNNY',
              description: {
                en: 'Sunny',
                pt: 'Ensolarado',
              },
              iconBaseUri: 'data:image/png;base64,...',
              type: 'CLEAR',
            },
            temperature: {
              current: 25,
              min: 20,
              max: 30,
              unit: "CELSIUS",
              degrees: 25,
            },
            feelsLikeTemperature: {
              current: 26,
              min: 21,
              max: 31,
              unit: "CELSIUS",
              degrees: 26,
            },
            precipitation: {
              type: 'NONE',
              intensity: 0,
              qpf: {
                quantity: 0,
                unit: 'MM',
              },
              probability: {
                percent: 0,
                type: 'NONE',
                qpf:{}
              },
            }
          },
          origin: { label: 'Home', latitude: '-23.5505', longitude: '-46.6333' },
          destination: { label: 'Work', latitude: '-23.5510', longitude: '-46.6340' },
          departureTime: '09:00:00',
          duration: 120,
          createdAt: '2025-08-04T10:24:00.000-03:00',
          updatedAt: '2025-08-04T10:24:00.000-03:00',
        },
      ],
      cardBalance: {
        id: 'balance_123',
        balance: 100,
        updatedAt: '2025-08-04T10:24:00.000-03:00',
      },
    };

    const result = CreateUserSchema.parse(validData);
    expect(result).toEqual(validData);
  });

  test('should validate a CreateUser object with default values', () => {
    const inputData = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      cardBalance: {
        id: 'balance_123',
        balance: 100,
        updatedAt: '2025-08-04T10:24:00.000-03:00',
      },
    };

    const result = CreateUserSchema.parse(inputData);
    expect(result).toEqual({
      ...inputData,
      defaultOrigin: null,
      destinations: [],
      marginInMinutes: 10,
      googleCalendarConnected: false,
      googleCalendarTokens: null,
      recharges: [],
      trips: [],
    });
  });

  test('should throw ZodError for missing required fields', () => {
    const invalidData = {
      // firstName, lastName, username, cardBalance ausentes
    };

    expect(() => CreateUserSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for empty required strings', () => {
    const invalidData = {
      firstName: '',
      lastName: '',
      username: '',
      cardBalance: {
        id: 'balance_123',
        balance: 100,
        updatedAt: '2025-08-04T10:24:00.000-03:00',
      },
    };

    expect(() => CreateUserSchema.parse(invalidData)).toThrow(z.ZodError);
  });

  test('should throw ZodError for incorrect field types', () => {
    const invalidData = {
      firstName: 123, 
      lastName: 456, 
      username: 789, 
      defaultOrigin: {
        label: 123, 
        latitude: -23.5505, 
        longitude: '-46.6333',
      },
      destinations: [
        {
          label: 'Work',
          latitude: -23.5510, 
          longitude: '-46.6340',
        },
      ],
      marginInMinutes: '15', 
      googleCalendarConnected: 'true', 
      googleCalendarTokens: {
        accessToken: 123, 
        refreshToken: 'refresh_token_456',
        expiresAt: '2025-08-04T10:24:00.000-03:00',
      },
      recharges: [
        {
          id: 123, 
          amount: '50', 
          date: '2025-08-04',
          createdAt: '2025-08-04T10:24:00.000-03:00',
          updatedAt: '2025-08-04T10:24:00.000-03:00',
        },
      ],
      trips: [
        {
          id: 'trip_123',
          origin: { label: 'Home', latitude: '-23.5505', longitude: '-46.6333' },
          destination: { label: 'Work', latitude: '-23.5510', longitude: -46.6340 }, 
          departureTime: 900, 
          createdAt: '2025-08-04T10:24:00.000-03:00',
          updatedAt: '2025-08-04T10:24:00.000-03:00',
        },
      ],
      cardBalance: {
        id: 123, 
        balance: '100', 
        updatedAt: '2025-08-04T10:24:00.000-03:00',
      },
    };

    expect(() => CreateUserSchema.parse(invalidData)).toThrow(z.ZodError);
  });
});