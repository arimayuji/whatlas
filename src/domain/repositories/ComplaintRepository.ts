import { Complaint } from "../entities/complaint.model";

type VoteResult = {
  status: 'voted' | 'changed' | 'removed',
  newScore: number
};

export interface ComplaintRepository {
  create: (complaint: Complaint) => Promise<Complaint>
  findAll: () => Promise<Complaint[]>
  findBySubjectType: (subjectType: string) => Promise<Complaint[]>
  vote: (id: string,userId: string, voteType: "up" | "down") => Promise<VoteResult>
}