import { BusRepository } from "../../domain/repositories/BusRepository"

interface GetTerminalBusLinesDTO{
  terminal: string
}

export class GetTerminalBusLinesUseCase{
  constructor(private busRepository: BusRepository) {}
  async execute(data: GetTerminalBusLinesDTO){
    return await this.busRepository.getAllBusLineOfTerminal(data.terminal)
  }
}