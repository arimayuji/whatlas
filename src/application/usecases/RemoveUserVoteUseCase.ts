import { ComplaintVoteRepository } from "../../domain/repositories/ComplaintVoteRepository";
import { logger } from "../../infra/logger";

interface RemoveUserVoteDTO {
  userId: string;
  complaintId: string;
}

export class RemoveUserVoteUseCase {
  constructor(private readonly complaintVoteRepository: ComplaintVoteRepository) { }

  async exec({ complaintId, userId }: RemoveUserVoteDTO) {
    logger.info(`[Vote] User ${userId} is removing their vote on complaint ${complaintId}`)
    const result = await this.complaintVoteRepository.removeVote(userId, complaintId)

    return result
  }
}