import { TrainStatusRepository } from "../../domain/repositories/TrainStatusRepository";
import { logger } from "../../infra/logger";

interface GetTrainStatusUseCaseDTO {
  name: string
}

export class GetTrainStatusUseCase {
  constructor(private trainStatusRepository: TrainStatusRepository) { }
  
  async execute({ name }: GetTrainStatusUseCaseDTO) {
    const trainStatus = await this.trainStatusRepository.getByName(name)
    
    if(!trainStatus) {
      return null
    }

    logger.info(`[TrainStatus] Train status fetched successfully`, {
      trainStatus: trainStatus
    })
    
    return trainStatus
  }
}