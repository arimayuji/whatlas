import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetArrivalPredicitonDTO {
  stopCode: number;
  lineCode: number;
}

export class GetArrivalPredicitonsUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({stopCode,lineCode}: GetArrivalPredicitonDTO) {
    return this.spTransApi.getArrivalPrediction(stopCode,lineCode);
  }
}
