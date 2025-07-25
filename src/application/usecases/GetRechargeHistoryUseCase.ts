import { Recharge } from "../../domain/entities/recharge.model";
import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { RechargeRepository } from "../../domain/repositories/RechargeRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { logger } from "../../infra/logger";

interface GetRechargeHistoryDTO {
  userId: string
}

export class GetRechargeHistoryUseCase{
  constructor(private readonly rechargeRepository: RechargeRepository, private readonly userRepository: UserRepository) { }
  
  async execute({ userId }: GetRechargeHistoryDTO): Promise<Recharge[]> {
    const userExists = await this.userRepository.findById(userId)

    if (!userExists) {
      logger.warn(`[Recharge] User ${userId} not found, cannot get history`)
      throw new UserNotExistsError()
    }

    logger.info(`[Recharge] Attempting to get history for user ${userId}`)
    
    return this.rechargeRepository.getRechargeHistory(userId)
  }
}