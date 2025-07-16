import { GetAllTrainStatusUseCase } from "../../application/usecases/GetAllTrainStatusUseCase";
import { GetTrainStatusUseCase } from "../../application/usecases/GetTrainStatusUseCase";
import { TrainStatusController } from "../../presentation/controllers/train-status.controller";
import { makeRepositories } from "../repositories";


export function makeTrainStatusController() {

  const repositories = makeRepositories()
  
  const getTrainStatusUseCase = new GetTrainStatusUseCase(repositories.trainStatusRepository)
  const getAllTrainStatusUseCase = new GetAllTrainStatusUseCase(repositories.trainStatusRepository)
  
  return new TrainStatusController(
    getTrainStatusUseCase,
    getAllTrainStatusUseCase
  )
}