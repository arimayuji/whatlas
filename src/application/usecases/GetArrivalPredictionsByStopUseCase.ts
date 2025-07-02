import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetArrivalPredicitonsByStopDTO {
  stopCode: number;
}

export class GetArrivalPredicitonsByStopUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({stopCode}: GetArrivalPredicitonsByStopDTO) {
    return this.spTransApi.getArrivalPredictionByStop(stopCode);
  }
}
