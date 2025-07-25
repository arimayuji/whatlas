import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { BalanceRepository } from "../../domain/repositories/BalanceRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { logger } from "../../infra/logger";

interface UpdateUserCardDTO {
  userId: string;
  currentBalance: number;
  updatedAt: string;
}

export class UpdateUserCardUseCase {
  constructor(private balanceRepository: BalanceRepository, private userRepository: UserRepository) { }
  
  async execute({ userId, currentBalance, updatedAt }: UpdateUserCardDTO): Promise<void> {
    const userExists = await this.userRepository.findById(userId)

    if (!userExists) {
      logger.warn(`[Balance] User ${userId} not found, cannot get balance`)
      throw new UserNotExistsError()
    }

    logger.info(`[Balance] Attempting to update balance for user ${userId}`)
    
    await this.balanceRepository.updateUserCardBalance(userId, { currentBalance, updatedAt: new Date().toISOString()  })
  }
}