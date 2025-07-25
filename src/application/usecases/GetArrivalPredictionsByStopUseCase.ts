import { logger } from "../../infra/logger";
import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetArrivalPredicitonsByStopDTO {
  stopCode: number;
}

export class GetArrivalPredicitonsByStopUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({stopCode}: GetArrivalPredicitonsByStopDTO) {
    const arrivalPredictions = await this.spTransApi.getArrivalPredictionByStop(stopCode);

    logger.info(`[ArrivalPrediction] Arrival predictions fetched successfully`, {
      arrivalPredictions
    })
    
    return arrivalPredictions;
  }
}
