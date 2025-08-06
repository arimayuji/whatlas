import * as Factory from "factory.ts";
import { UserCardBalance } from "../../src/domain/entities/user-card-balance.model";
import { faker } from '@faker-js/faker';

export const cardBalanceFactory = Factory.Sync.makeFactory<UserCardBalance>({
  createdAt: faker.date.past().toISOString(),
  remainingSubwayTickets: faker.number.int({min: 0, max: 10}),
  currentBalance: faker.number.int({min: 0, max: 1000}),
  updatedAt: null,
  remainingBusTickets: faker.number.int({min: 0, max: 10}),
});