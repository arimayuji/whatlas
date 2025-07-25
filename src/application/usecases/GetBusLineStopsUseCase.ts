import { BusRepository } from "../../domain/repositories/BusRepository";
import { logger } from "../../infra/logger";

interface GetBusLineStopsDTO {
  busline:string;
}

export class GetBusLineStopsUseCase {
  constructor(private busRepository: BusRepository) {}
  async execute({ busline }: GetBusLineStopsDTO) {
    const busLineStops = await this.busRepository.getAllStopsOfBusLine(busline);

    logger.info(`[BusLineStops] Bus line stops fetched successfully`, {
      busLineStops
    })
    
    return busLineStops
  }
}