import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { UserRepository } from "../../domain/repositories/UserRepository";

interface DeleteUserUseCaseDTO {
  id: string
}

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: DeleteUserUseCaseDTO) {
    
    const existing = await this.userRepository.findById(id);

    if (!existing) throw new UserNotExistsError();
    
    return this.userRepository.delete(id);
  }
}
