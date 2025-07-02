import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetStopsByLineDTO {
  lineCode: number;
}

export class GetStopsByLineeUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({lineCode}: GetStopsByLineDTO) {
    return this.spTransApi.getStopsByLine(lineCode);
  }
}
