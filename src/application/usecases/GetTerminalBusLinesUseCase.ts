import { BusRepository } from "../../domain/repositories/BusRepository"
import { logger } from "../../infra/logger";

interface GetTerminalBusLinesDTO{
  terminal: string
}

export class GetTerminalBusLinesUseCase{
  constructor(private busRepository: BusRepository) {}
  async execute(data: GetTerminalBusLinesDTO){
    const busLines = await this.busRepository.getAllBusLineOfTerminal(data.terminal)

    if (!busLines) return [];
    
    logger.info(`[BusLine] Bus lines fetched successfully`, {
      busLines
    })

    return busLines
  }
}