import { TrainStatusRepository } from "../../domain/repositories/TrainStatusRepository";
import { logger } from "../../infra/logger";

export class GetAllTrainStatusUseCase {
  constructor(private trainStatusRepository: TrainStatusRepository) { }
  
  async execute() {
    const trainStatus = await this.trainStatusRepository.getAll()

    logger.info(`[TrainStatus] Train status fetched successfully`, {
      trainStatus: trainStatus
    })
    
    return trainStatus
  }
}