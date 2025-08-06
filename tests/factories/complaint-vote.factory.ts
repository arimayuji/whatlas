import * as Factory from "factory.ts";
import { ComplaintVote } from "../../src/domain/entities/complaint-vote.model";
import { faker } from "@faker-js/faker";

export const complaintVoteFactory = Factory.Sync.makeFactory<ComplaintVote>({
  complaintId:faker.string.uuid(),
  id:faker.string.uuid(),
  userId:faker.string.uuid(),
  vote_type: "up",
})