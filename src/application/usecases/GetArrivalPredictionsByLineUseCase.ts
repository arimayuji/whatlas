import { logger } from "../../infra/logger";
import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetArrivalPredicitonsByLineDTO {
  lineCode: number;
}

export class GetArrivalPredicitonsByLineUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({lineCode}: GetArrivalPredicitonsByLineDTO) {
    const arrivalPrediction = await this.spTransApi.getArrivalPredictionByLine(lineCode);

    logger.info(`[ArrivalPrediction] Arrival predictions fetched successfully`, {
      arrivalPrediction
    })
    
    return arrivalPrediction;
  }
}
