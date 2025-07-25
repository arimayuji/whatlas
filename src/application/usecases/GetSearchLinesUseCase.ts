
import { logger } from "../../infra/logger";
import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetSearchLineDTO {
  term: string
 }

export class GetSearchLineUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({term}: GetSearchLineDTO) {
    const searchLines = await this.spTransApi.searchLines(term);

    if(!searchLines || searchLines.length === 0)
      return [];

    logger.info(`[Search Line] Lines found: ${searchLines.length}`)

    return searchLines
  }
}
