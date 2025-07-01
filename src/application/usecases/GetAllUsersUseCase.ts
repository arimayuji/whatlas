import { UserRepository } from "../../domain/repositories/UserRepository";

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    return this.userRepository.findAll()
  }
}
