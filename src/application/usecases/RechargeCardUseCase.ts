import { NegativeRechargeError } from "../../domain/errors/NegativeRechargeError"
import { BalanceRepository } from "../../domain/repositories/BalanceRepository"

interface RechargeCardUseCaseDTO {
  userId: string
  amount: number
}

export class RechargeCardUseCase {
  constructor(private readonly balanceRepository: BalanceRepository) { }
  
  async execute({ userId, amount }: RechargeCardUseCaseDTO): Promise<void> {
    const currentBalance = await this.balanceRepository.getUserCardBalance(userId)

    if (amount < 0) {
      throw new NegativeRechargeError()
    }

    const newBalance = currentBalance + amount

    await this.balanceRepository.updateUserCardBalance(userId, { currentBalance: newBalance, updatedAt: new Date().toISOString() })
  }
}