import { UserNotExistsError } from "../../domain/errors/UserNotExistsError"
import { BalanceRepository } from "../../domain/repositories/BalanceRepository"
import { UserRepository } from "../../domain/repositories/UserRepository"

interface GetRemainingTicketsDTO {
  userId: string
}

export class GetRemainingTicketsUseCase {
  constructor(private readonly balanceRepository: BalanceRepository,private readonly userRepository: UserRepository ) { }
  
  async execute({ userId }: GetRemainingTicketsDTO) {
    const userExists = await this.userRepository.findById(userId)

    if (!userExists) {
      throw new UserNotExistsError()
    }
    
    const { busTickets, subwayTickets } = await this.balanceRepository.getRemainingTickets(userId)
    return { busTickets, subwayTickets }
  }
}