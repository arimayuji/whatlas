import { NegativeRechargeError } from "../../domain/errors/NegativeRechargeError"
import { BalanceRepository } from "../../domain/repositories/BalanceRepository"
import { logger } from "../../infra/logger"

interface RechargeCardUseCaseDTO {
  userId: string
  amount: number
}

export class RechargeCardUseCase {
  constructor(private readonly balanceRepository: BalanceRepository) { }
  
  async execute({ userId, amount }: RechargeCardUseCaseDTO): Promise<void> {
    const currentBalance = await this.balanceRepository.getUserCardBalance(userId)

    if (amount < 0) {
      logger.error(`[Recharge] Amount cannot be negative`)
      throw new NegativeRechargeError()
    }

    if (amount === 0) {
      logger.error(`[Recharge] Amount cannot be zero`)
      throw new NegativeRechargeError()
    }

    logger.info(`[Recharge] Attempting to add ${amount} to balance for user ${userId}`)

    const newBalance = currentBalance + amount

    await this.balanceRepository.updateUserCardBalance(userId,newBalance, new Date().toISOString())
  }
}