import { TrainStatusRepository } from "../../domain/repositories/TrainStatusRepository"

export class FindAllTrainStatusByIdUseCase {
  constructor(private readonly trainStatusRepository: TrainStatusRepository) {}
  
  async execute() {
    return this.trainStatusRepository.getAll()
  }
}