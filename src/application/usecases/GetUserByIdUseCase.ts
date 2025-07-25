import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { logger } from "../../infra/logger";

interface GetUserByIdDTO {
  id: string
}

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: GetUserByIdDTO) {
    const existing = await this.userRepository.findById(id);

    if (!existing) {
      logger.warn(`[User] User ${id} not found, cannot get`)
      throw new UserNotExistsError();
    }

    logger.info(`[User] Attempting to get user ${id}`)

    return this.userRepository.findById(id);
  }
}
