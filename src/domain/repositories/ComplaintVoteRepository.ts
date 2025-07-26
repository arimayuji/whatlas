import { ComplaintVote } from "../entities/complaint-vote.model"
import { DeleteResult } from "./dtos/DeleteResult"

export interface ComplaintVoteRepository {
  registerVote(userId: string,complaintId: string, voteType: "up" | "down"): Promise<ComplaintVote>
  hasVoted(userId: string,complaintId: string): Promise<boolean>
  getVote(userId: string, complaintId: string): Promise<"up" | "down" | null>
  removeVote(userId: string,complaintId: string): Promise<DeleteResult>
}