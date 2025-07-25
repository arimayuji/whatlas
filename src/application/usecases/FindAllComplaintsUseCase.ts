import { ComplaintRepository } from "../../domain/repositories/ComplaintRepository";
import { logger } from "../../infra/logger";

export class FindAllComplaintsUseCase {
  constructor(private readonly complaintRepository: ComplaintRepository) { }
  
  async execute() {
    const complaints = await this.complaintRepository.findAll()

    if (!complaints) {
      return []
    }

    logger.info(`Complaints found: ${complaints.length}`)

    return complaints
  }
}