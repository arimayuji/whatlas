import { logger } from "../../infra/logger";
import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetArrivalPredicitonDTO {
  stopCode: number;
  lineCode: number;
}

export class GetArrivalPredicitonsUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({stopCode,lineCode}: GetArrivalPredicitonDTO) {
    const arrivals = await this.spTransApi.getArrivalPrediction(stopCode, lineCode);
    
    logger.info(`[ArrivalPrediction] Arrival predictions fetched successfully`, {
      arrivals
    })
    
    return arrivals;
  }
}
