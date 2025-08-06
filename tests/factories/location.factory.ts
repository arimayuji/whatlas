import * as Factory from "factory.ts";
import { Location } from "../../src/domain/entities/location.model";
import { faker } from "@faker-js/faker";

export const locationFactory = Factory.Sync.makeFactory<Location>({
  label: faker.location.city(),
  latitude: faker.location.latitude().toString(),
  longitude: faker.location.longitude().toString(),
})