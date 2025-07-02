import { NegativeRechargeError } from "../../domain/errors/NegativeRechargeError"
import { BalanceRepository } from "../../domain/repositories/BalanceRepository"

interface RechargeCardUseCaseDTO {
  cardId: string
  amount: number
}

export class RechargeCardUseCase {
  constructor(private readonly balanceRepository: BalanceRepository) { }
  
  async execute({ cardId, amount }: RechargeCardUseCaseDTO): Promise<void> {
    const currentBalance = await this.balanceRepository.getUserCardBalance(cardId)

    if (amount < 0) {
      throw new NegativeRechargeError()
    }

    const newBalance = currentBalance + amount

    await this.balanceRepository.updateUserCardBalance(cardId, { currentBalance: newBalance, updatedAt: new Date().toISOString() })
  }
}