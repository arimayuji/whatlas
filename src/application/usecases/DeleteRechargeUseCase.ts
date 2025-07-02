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

    if(!recharges.find(recharge => recharge.id === rechargeId)) {
      throw new RechargeNotExists()
    }

    const userExists = await this.userRepository.findById(userId)

    if (!userExists) {
      throw new UserNotExistsError()
    }

    return this.rechargeRepository.deleteRecharge(rechargeId, userId)
  }
}