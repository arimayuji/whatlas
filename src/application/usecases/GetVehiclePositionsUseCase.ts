import { logger } from "../../infra/logger";
import { SpTransGateway } from "../gateways/SpTransGateway";

export class GetVehiclePositionsUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute() {
    const vehiclePositions = await this.spTransApi.getVehiclePositions();

    logger.info(`[VehiclePositions] Vehicle positions fetched successfully`, {
      vehiclePositions
    })
    
    return vehiclePositions
  }
}
