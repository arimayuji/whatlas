import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetVehiclePositionsByLineDTO {
  lineCode: number;
}

export class GetVehiclePositionsByLineUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({lineCode}: GetVehiclePositionsByLineDTO) {
    return this.spTransApi.getVehiclePositionsByLine(lineCode);
  }
}
