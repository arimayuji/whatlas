import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetArrivalPredicitonsByLineDTO {
  lineCode: number;
}

export class GetArrivalPredicitonsByLineUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({lineCode}: GetArrivalPredicitonsByLineDTO) {
    return this.spTransApi.getArrivalPredictionByLine(lineCode);
  }
}
