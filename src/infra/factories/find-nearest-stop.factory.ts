import { FindNearestStopUseCase } from "../../application/usecases/FindNearestStopUseCase";
import { FindNearestStopController } from "../../presentation/controllers/find-nearest-stop.controller";
import { repositories } from "../repositories";

export function findNearestStop() {
  
  const findNearestStopUseCase = new FindNearestStopUseCase(
    repositories.geoRepository
  )
  
  return new FindNearestStopController(
    findNearestStopUseCase
  )
}