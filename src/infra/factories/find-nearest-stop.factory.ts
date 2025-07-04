import { FindNearestStopUseCase } from "../../application/usecases/FindNearestStopUseCase";
import { FindNearestStopController } from "../../presentation/controllers/find-nearest-stop.controller";
import { makeRepositories } from "../repositories";

export function makeFindNearestStopController() {
  const repositories = makeRepositories()
  
  const findNearestStopUseCase = new FindNearestStopUseCase(
    repositories.geoRepository
  )
  
  return new FindNearestStopController(
    findNearestStopUseCase
  )
}