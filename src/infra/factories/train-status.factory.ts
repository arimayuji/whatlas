import { FindAllTrainStatusByIdUseCase } from "../../application/usecases/FindAllTrainStatusUseCase";
import { GetTrainStatusById } from "../../application/usecases/GetTrainStatusByIdUseCase";
import { GetTrainStatusByLine } from "../../application/usecases/GetTrainStatusByLineUseCase";
import { TrainStatusController } from "../../presentation/controllers/train-status.controller";
import { makeRepositories } from "../repositories";


export function makeTrainStatusController() {

  const repositories = makeRepositories()
  
  const getTrainStatusByIdUseCase = new GetTrainStatusById(repositories.trainStatusRepository)
  const getTrainStatusByLineUseCase = new GetTrainStatusByLine(repositories.trainStatusRepository)
  const getAllTrainStatusUseCase = new FindAllTrainStatusByIdUseCase(repositories.trainStatusRepository)
  
  return new TrainStatusController(
    getTrainStatusByIdUseCase,
    getTrainStatusByLineUseCase,
    getAllTrainStatusUseCase
  )
}