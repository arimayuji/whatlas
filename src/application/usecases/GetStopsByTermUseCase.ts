import { logger } from "../../infra/logger";
import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetStopsByTermDTO {
  term: string;
}

export class GetStopsByTermeUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({term}: GetStopsByTermDTO) {
    const stops = await this.spTransApi.getStopsByTerm(term);

    if(!stops || stops.length === 0) return []
    
    logger.info(`[Stops] Stops fetched successfully`, {
      stops
    })
    
    return stops
  }
}
