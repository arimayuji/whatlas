import { ComplaintVoteRepository } from "../../domain/repositories/ComplaintVoteRepository";
import { logger } from "../../infra/logger";

interface GetUserVoteDTO{
  userId: string,
  complaintId: string
}

export class GetUserVoteUseCase{
  constructor(private readonly complaintVoteRepository: ComplaintVoteRepository) { }
  
  async exec({ complaintId, userId }: GetUserVoteDTO) {
    const result = await this.complaintVoteRepository.getVote(userId, complaintId)

    if (result === null) {
      logger.info(`[Vote] User ${userId} has not voted on complaint ${complaintId}`)
    }

    logger.info(`[Vote] User ${userId} has voted on complaint ${complaintId}`, {result})

    return result
  }
}