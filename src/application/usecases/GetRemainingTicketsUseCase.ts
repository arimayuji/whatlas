import { UserNotExistsError } from "../../domain/errors/UserNotExistsError"
import { BalanceRepository } from "../../domain/repositories/BalanceRepository"
import { UserRepository } from "../../domain/repositories/UserRepository"
import { logger } from "../../infra/logger"

interface GetRemainingTicketsDTO {
  userId: string
}

export class GetRemainingTicketsUseCase {
  constructor(private readonly balanceRepository: BalanceRepository,private readonly userRepository: UserRepository ) { }
  
  async execute({ userId }: GetRemainingTicketsDTO) {
    const userExists = await this.userRepository.findById(userId)

    if (!userExists) {
      logger.warn(`[Ticket] User ${userId} not found, cannot get tickets`)
      throw new UserNotExistsError()
    }

    logger.info(`[Ticket] Attempting to get tickets for user ${userId}`)
    
    const { busTickets, subwayTickets } = await this.balanceRepository.getRemainingTickets(userId)
    return { busTickets, subwayTickets }
  }
}