import { logger } from "firebase-functions";
import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { UserRepository } from "../../domain/repositories/UserRepository";

interface DeleteUserUseCaseDTO {
  id: string
}

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: DeleteUserUseCaseDTO) {
    
    const existing = await this.userRepository.findById(id);

    if (!existing) {
      logger.warn(`[User] User ${id} not found, cannot delete`)
      throw new UserNotExistsError();
    }

    logger .info(`[User] User ${id} deleted successfully`)
    
    return this.userRepository.delete(id);
  }
}
