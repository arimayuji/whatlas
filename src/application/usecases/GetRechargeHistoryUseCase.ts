import { Recharge } from "../../domain/entities/recharge.model";
import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { RechargeRepository } from "../../domain/repositories/RechargeRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";

interface GetRechargeHistoryDTO {
  userId: string
}

export class GetRechargeHistoryUseCase{
  constructor(private readonly rechargeRepository: RechargeRepository, private readonly userRepository: UserRepository) { }
  
  async execute({ userId }: GetRechargeHistoryDTO): Promise<Recharge[]> {
    const userExists = await this.userRepository.findById(userId)

    if (!userExists) {
      throw new UserNotExistsError()
    }
    
    return this.rechargeRepository.getRechargeHistory(userId)
  }
}