import { logger } from "../../infra/logger";
import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetStopsByCorredorDTO {
  corredorCode: number
}

export class GetStopsByCorredorUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({corredorCode}: GetStopsByCorredorDTO) {
    const stops = await this.spTransApi.getStopsByCorredor(corredorCode)

    if(!stops || stops.length === 0) return []
    
    logger.info(`[Stops] Stops fetched successfully`, {
      stops
    })

    return stops
  }
}
