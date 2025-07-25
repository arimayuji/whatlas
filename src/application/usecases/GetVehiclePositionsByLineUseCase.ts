import { logger } from "../../infra/logger";
import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetVehiclePositionsByLineDTO {
  lineCode: number;
}

export class GetVehiclePositionsByLineUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({lineCode}: GetVehiclePositionsByLineDTO) {
    const vehiclePositions = await this.spTransApi.getVehiclePositionsByLine(lineCode);

    logger.info(`[VehiclePositions] Vehicle positions fetched successfully`, {
      vehiclePositions
    })
    
    return vehiclePositions
  }
}
