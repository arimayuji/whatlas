import { ComplaintRepository } from "../../domain/repositories/ComplaintRepository";
import { logger } from "../../infra/logger";

interface GetComplaintsBySubjectDTO{
  subjectType: string
}

export class GetComplaintsBySubjectTypeUseCase {
  constructor(private complaintRepository: ComplaintRepository) { }
  
  async exec({ subjectType }: GetComplaintsBySubjectDTO) {
    const complaints = await this.complaintRepository.findBySubjectType(subjectType);

    if (!complaints) {
      return []
    }

    logger.info(`Complaints found: ${complaints.length}`)

    return complaints
  }
}