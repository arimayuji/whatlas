import * as Factory from "factory.ts";
import { Trip } from "../../src/domain/entities/trip.model";
import { faker } from '@faker-js/faker';

export const tripFactory = Factory.Sync.makeFactory<Trip>({
  id: Factory.each(i => `trip-${i}`),
  createdAt: faker.date.past().toISOString(),
  destination: {
    label: faker.location.city(),
    latitude: faker.location.latitude().toString(),
    longitude: faker.location.longitude().toString(),
  },
  arrivalAt: faker.date.future().toISOString(),
  duration: faker.number.int({min: 10, max: 120}),
  weatherCondition: {
    feelsLikeTemperature: {
      degrees: faker.number.int({min: 10, max: 40}),
      unit: 'CELSIUS'
    },
    precipitation: {
      probability: {
        percent: faker.number.int({min: 0, max: 100}),
        type: 'HEAVY_RAIN'
      },
      qpf: {
        quantity: faker.number.float({min: 0, max: 2,fractionDigits: 2}),
        unit: 'MM'
      },
    },
    temperature: {
      degrees: faker.number.int({min: 10, max: 40}),
      unit: 'CELSIUS'
    },
    weatherCondition: {
      description: {
        text: faker.lorem.words(3),
        languageCode: 'en',
      },
      iconBaseUri: 'https://example.com/weather-icons',
      type: 'CLEAR',
    },
  },
  updatedAt:  faker.date.past().toISOString(),
  steps: [],
  status: "COMPLETED",
  isFavorite: faker.datatype.boolean(),
  totalAmount: faker.number.int({min: 5, max: 20}),
  origin: {
    label: faker.location.city(),
    latitude: faker.location.latitude().toString(),
    longitude: faker.location.longitude().toString(),
  }
})