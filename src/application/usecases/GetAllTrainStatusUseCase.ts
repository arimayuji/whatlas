import { TrainStatusRepository } from "../../domain/repositories/TrainStatusRepository";

export class GetAllTrainStatusUseCase {
  constructor(private trainStatusRepository: TrainStatusRepository) { }
  
  async execute() {
    return this.trainStatusRepository.getAll()
  }
}