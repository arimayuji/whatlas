import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { BalanceRepository } from "../../domain/repositories/BalanceRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { logger } from "../../infra/logger";

interface UpdateUserCardDTO {
  userId: string;
}

export class GetUserCardUseCase {
  constructor(private balanceRepository: BalanceRepository, private userRepository: UserRepository) { }
  
  async execute({ userId }: UpdateUserCardDTO): Promise<void> {
    const userExists = await this.userRepository.findById(userId)

    if (!userExists) {
      logger.warn(`[Balance] User ${userId} not found, cannot get balance`)
      throw new UserNotExistsError()
    }

    logger.info(`[Balance] Attempting to get balance for user ${userId}`)
    
    await this.balanceRepository.getUserCardBalance(userId)
  }
}