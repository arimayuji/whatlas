import * as Factory from "factory.ts";
import { User } from "../../src/domain/entities/user.model";
import { cardBalanceFactory } from "./card-balance.factory";
import { faker } from '@faker-js/faker';
import { rechargeFactory } from "./recharge.factory";
import { tripFactory } from "./trip.factory";

const personFactory = Factory.Sync.makeFactory<User>({
    id: Factory.each(i => `user-${i}`),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.lorem.word(1), 
    defaultOrigin: null,
    cardBalance: cardBalanceFactory.build(),
    updatedAt: null,
    destinations: [],
    createdAt: faker.date.past().toISOString(),
    marginInMinutes: faker.number.int({min: 0, max: 30}),
    googleCalendarConnected: false,
    googleCalendarTokens: null,
    recharges: [rechargeFactory.build()],
    trips: [tripFactory.build()],
});