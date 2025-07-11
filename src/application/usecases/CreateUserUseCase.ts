import { Location } from "../../domain/entities/location.model";
import { GoogleTokens } from "../../domain/entities/user.model";
import { UserAlreadyExistsError } from "../../domain/errors/UserAlreadyExists";
import { UserRepository } from "../../domain/repositories/UserRepository";

interface CreateUserDTO {
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
  googleCalendarTokens?: GoogleTokens | null;
  destinations: Location[];
  defaultOrigin?: Location | null;
  id: string
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ createdAt, firstName, id, lastName, username,destinations, defaultOrigin,googleCalendarTokens }: CreateUserDTO) {
    const existing = await this.userRepository.findById(id);

    if (existing) {
      throw new UserAlreadyExistsError();
    }
    
    return this.userRepository.create({
      createdAt, firstName, id, lastName, username, destinations, defaultOrigin: defaultOrigin, marginInMinutes: 10, googleCalendarConnected: false, googleCalendarTokens : null, updatedAt: createdAt, recharges: [], trips: [], cardBalance: {
        currentBalance: 0,
        remainingBusTickets: 0,
        remainingSubwayTickets: 0,
        createdAt: createdAt,
        updatedAt: createdAt
    }});
  }
}
