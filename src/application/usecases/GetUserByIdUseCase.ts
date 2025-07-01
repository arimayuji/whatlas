import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { UserRepository } from "../../domain/repositories/UserRepository";

interface GetUserByIdDTO {
  id: string
}

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: GetUserByIdDTO) {
    const existing = await this.userRepository.findById(id);

    if (!existing) {
      throw new UserNotExistsError();
    }

    return this.userRepository.findById(id);
  }
}
