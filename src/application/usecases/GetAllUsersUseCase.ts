import { UserRepository } from "../../domain/repositories/UserRepository";
import { logger } from "../../infra/logger";

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    const users = this.userRepository.findAll()

    logger.info(`[User] Users fetched successfully`, {
      users
    })
    
    return users
  }
}
