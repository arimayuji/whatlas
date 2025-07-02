import { SpTransGateway } from "../gateways/SpTransGateway";

export class GetVehiclePositionsUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute() {
    return this.spTransApi.getVehiclePositions();
  }
}
