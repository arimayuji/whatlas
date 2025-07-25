import { AppError } from "../../domain/errors/app-error";
import { EntityNotExistsError } from "../../domain/errors/EntityNotExists";
import { ComplaintRepository } from "../../domain/repositories/ComplaintRepository"
import { EntityVerifierRepository } from "../../domain/repositories/EntityVerifierRepository";
import { v4 as uuidv4} from 'uuid'
import { logger } from "../../infra/logger";

export const tableColumnMap = {
  terminal_onibus: { table: 'terminal_onibus', column: 'nm_termina' },
  linhas_metro: { table: 'linhas_metro', column: 'lmt_linom' },
  linhas_trem: { table: 'linhas_trem', column: 'ltr_nome' },
  linhas_onibus: { table: 'routes', column: 'route_id' },
};

interface CreateComplaintUseCaseDTO{
  text: string
  subjectType: 'terminal_onibus' | 'linhas_metro' | 'linhas_trem' | 'linhas_onibus'
}

export class CreateComplaintUseCase {
  constructor(private readonly complaintRepository: ComplaintRepository, private readonly entityVerifierRepository: EntityVerifierRepository) { }
  
  async exec({subjectType,text} : CreateComplaintUseCaseDTO) {
    const config = tableColumnMap[subjectType];

    if (!config) {
      logger.error(`Invalid subject type: ${subjectType}`);
      throw new AppError("Invalid subject type", 400);
    }

    const gid = await this.entityVerifierRepository.findGidByValue({
      table: config.table,
      column: config.column,
      value: text,
    });

    if (!gid) throw new EntityNotExistsError(subjectType);

    const complaint = await this.complaintRepository.create({
      id: uuidv4(),
      text,
      subjectType,
      subjectId: gid,
      upVotes: 0,
      downVotes: 0,
      createdAt: new Date().toISOString()
    });

    logger.info(`[Complaint] Complaint ${complaint.id} created successfully`)

    return complaint
  }
}