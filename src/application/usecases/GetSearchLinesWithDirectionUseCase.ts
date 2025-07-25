
import { logger } from "../../infra/logger";
import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetSearchLineWithDirectionDTO {
  term: string
  direction: 1 | 2
 }

export class GetSearchLineWithDirectionUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({term, direction}: GetSearchLineWithDirectionDTO) {
    const searchLine = await this.spTransApi.searchLineWithDirection(term, direction);
    
    if(!searchLine || searchLine.length === 0)
      return [];

    logger.info(`[Search Line] Lines found: ${searchLine.length}`)

    return searchLine
  }
}
