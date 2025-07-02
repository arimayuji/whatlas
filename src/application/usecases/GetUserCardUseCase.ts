import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { BalanceRepository } from "../../domain/repositories/BalanceRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";

interface UpdateUserCardDTO {
  userId: string;
}

export class UpdateUserCardUseCase {
  constructor(private balanceRepository: BalanceRepository, private userRepository: UserRepository) { }
  
  async execute({ userId }: UpdateUserCardDTO): Promise<void> {
    const userExists = await this.userRepository.findById(userId)

    if (!userExists) {
      throw new UserNotExistsError()
    }
    
    await this.balanceRepository.getUserCardBalance(userId)
  }
}