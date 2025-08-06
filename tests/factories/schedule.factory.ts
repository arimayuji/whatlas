import * as Factory from "factory.ts";
import { Schedule } from "../../src/domain/entities/schedule.model";
import { faker } from "@faker-js/faker";

export const scheduleFactory = Factory.Sync.makeFactory<Schedule>({
  id: faker.string.uuid(),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.past().toISOString(),
  date: faker.date.future().toISOString(),
  time: faker.date.future().toISOString(),
  notificationSent: faker.datatype.boolean(),
  origin: {
    label: faker.location.city(),
    latitude: faker.location.latitude().toString(),
    longitude: faker.location.longitude().toString(),
  },
  destination: {
    label: faker.location.city(),
    latitude: faker.location.latitude().toString(),
    longitude: faker.location.longitude().toString(),
  },
})