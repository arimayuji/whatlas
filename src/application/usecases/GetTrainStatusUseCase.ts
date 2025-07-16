import { TrainStatusRepository } from "../../domain/repositories/TrainStatusRepository";

interface GetTrainStatusUseCaseDTO {
  name: string
}

export class GetTrainStatusUseCase {
  constructor(private trainStatusRepository: TrainStatusRepository) { }
  
  async execute({ name }: GetTrainStatusUseCaseDTO) {
    return this.trainStatusRepository.getByName(name)
  }
}