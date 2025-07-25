import { ComplaintRepository } from "../../domain/repositories/ComplaintRepository"
import { logger } from "../../infra/logger"

type VoteComplaintDTO = {
  voteType : "up" | "down",
  userId : string,
  complaintId : string
}

export class UpVoteComplaintUseCase {
  constructor(private readonly complaintRepository: ComplaintRepository) {}

  async exec({ complaintId, userId, voteType }: VoteComplaintDTO) {
    logger.info(`[Vote] User ${userId} is voting '${voteType}' on complaint ${complaintId}`)

    const result = await this.complaintRepository.vote(complaintId, userId, voteType)

    logger.info(`[Vote] Vote result for complaint ${complaintId}`, result)

    return result
  }
}
