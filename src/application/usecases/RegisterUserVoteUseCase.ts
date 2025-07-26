import { ComplaintVoteRepository } from "../../domain/repositories/ComplaintVoteRepository"
import { logger } from "../../infra/logger"

interface RegisterUserVoteDTO {
  userId: string
  complaintId: string
  voteType: "up" | "down"
}

export class RegisterUserVoteUseCase {
  constructor(private readonly complaintVoteRepository: ComplaintVoteRepository) { }
  
  async exec({ userId, complaintId, voteType }: RegisterUserVoteDTO) {    
    const result = await this.complaintVoteRepository.registerVote(userId, complaintId, voteType)
    
    logger.info(`[Vote] User ${userId} is voting '${voteType}' on complaint ${complaintId}`)

    return result
  }
}