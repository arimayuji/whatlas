import { logger } from "../../infra/logger";
import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetStopsByLineDTO {
  lineCode: number;
}

export class GetStopsByLineeUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({lineCode}: GetStopsByLineDTO) {
    const stops = await this.spTransApi.getStopsByLine(lineCode);

    if (!stops || stops.length === 0) return []
    
    logger.info(`[Stops] Stops fetched successfully`, {
      stops
    })
    
    return stops
  }
}
