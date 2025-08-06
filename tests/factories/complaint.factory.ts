import * as Factory from "factory.ts";
import { Complaint } from "../../src/domain/entities/complaint.model";
import { faker } from "@faker-js/faker";

export const userCardFactory = Factory.Sync.makeFactory<Complaint>({
  createdAt: faker.date.past().toISOString(),
  id: faker.string.uuid(),
  downVotes: faker.number.int({ min: 0, max: 10 }),
  upVotes: faker.number.int({ min: 0, max: 10 }),
  subjectId: faker.string.uuid(),
  subjectType: "terminal_metro",
  text: faker.lorem.sentence(),
})