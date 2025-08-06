import * as Factory from "factory.ts";
import { Recharge } from "../../src/domain/entities/recharge.model";
import { faker } from "@faker-js/faker";

export const rechargeFactory = Factory.Sync.makeFactory<Recharge>({
  id: faker.string.uuid(),
  rechargeAmount: Factory.each(i => i * 10),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.past().toISOString(),
})