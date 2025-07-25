import { logger } from "firebase-functions"
import { RechargeNotExists } from "../../domain/errors/RechargeNotExists"
import { UserNotExistsError } from "../../domain/errors/UserNotExistsError"
import { RechargeRepository } from "../../domain/repositories/RechargeRepository"
import { UserRepository } from "../../domain/repositories/UserRepository"

interface DeleteRechargeUseCaseDTO {
  rechargeId: string
  userId: string
}

export class DeleteRechargeUseCase {
  constructor(private readonly rechargeRepository: RechargeRepository, private readonly userRepository: UserRepository) { }
  
  async execute({ rechargeId, userId }: DeleteRechargeUseCaseDTO): Promise<boolean> {
    const recharges = await this.rechargeRepository.getRechargeHistory(userId)

    if (recharges.length === 0) {
      return false
    }

    if (!recharges.find(recharge => recharge.id === rechargeId)) {
      logger.warn(`[Recharge] Recharge ${rechargeId} not found, cannot delete`)
      throw new RechargeNotExists()
    }

    const userExists = await this.userRepository.findById(userId)

    if (!userExists) {
      logger.warn(`[Recharge] User ${userId} not found, cannot delete`)
      throw new UserNotExistsError()
    }

    return this.rechargeRepository.deleteRecharge(rechargeId, userId)
  }
}