import { GetTrainStatusUseCase } from "../../application/usecases/GetTrainsStatusUseCase";
import { TrainStatusController } from "../../presentation/controllers/train-status.controller";
import { makeRepositories } from "../repositories";


export function makeTrainStatusController() {
  const repositories = makeRepositories()
  
  const getTrainStatusUseCase = new GetTrainStatusUseCase(repositories.trainStatusRepository)
  
  return new TrainStatusController(
    getTrainStatusUseCase,
  )
}