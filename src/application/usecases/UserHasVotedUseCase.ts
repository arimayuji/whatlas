import { ComplaintVoteRepository } from "../../domain/repositories/ComplaintVoteRepository"
import { logger } from "../../infra/logger"

interface UserHasVotedDTO {
  userId: string
  complaintId: string
}

export class UserHasVotedUseCase {
  constructor(private readonly complaintVoteRepository: ComplaintVoteRepository) { }
  
  async exec({ userId, complaintId }: UserHasVotedDTO) {
    const result = await this.complaintVoteRepository.hasVoted(userId, complaintId)
    
    logger.info(`[Vote] User ${userId} has voted on complaint ${complaintId}`, {result})

    return result
  }
}