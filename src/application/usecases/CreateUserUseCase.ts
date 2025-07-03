import { Location } from "../../domain/entities/location.model";
import { UserAlreadyExistsError } from "../../domain/errors/UserAlreadyExists";
import { UserRepository } from "../../domain/repositories/UserRepository";

interface CreateUserDTO {
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
  destinations: Location[];
  id: string
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ createdAt, firstName, id, lastName, username }: CreateUserDTO) {
    const existing = await this.userRepository.findById(id);

    if (existing) {
      throw new UserAlreadyExistsError();
    }
    
    return this.userRepository.create({
      createdAt, firstName, id, lastName, username, destinations: [], defaultOrigin: undefined, marginInMinutes: 10, googleCalendarConnected: false, googleCalendarTokens: undefined, updatedAt: createdAt, recharges: [], trips: [], balance: {
        currentBalance: 0,
        remainingBusTickets: 0,
        remainingSubwayTickets: 0,
        createdAt: createdAt,
        updatedAt: createdAt
    }});
  }
}
