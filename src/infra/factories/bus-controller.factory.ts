import { GetBusLineStopsUseCase } from "../../application/usecases/GetBusLineStopsUseCase"
import { GetTerminalBusLinesUseCase } from "../../application/usecases/GetTerminalBusLinesUseCase"
import { BusController } from "../../presentation/controllers/bus.controller"
import { makeRepositories } from "../repositories"

export function makeBusController() {
  const repositories = makeRepositories()

  const getTerminalBusLinesUseCase = new GetTerminalBusLinesUseCase(repositories.busRepository)
  const getBusLineStopsUseCase = new GetBusLineStopsUseCase(repositories.busRepository)
  
  return new BusController(
    getTerminalBusLinesUseCase,
    getBusLineStopsUseCase
  )
}