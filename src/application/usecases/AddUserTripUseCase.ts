import { Trip } from "../../domain/entities/trip.model";
import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { TripRepository } from "../../domain/repositories/TripRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";

interface AddUserTripDTO {
  userId: string;
  trip: Trip;
}

export class AddUserTripUseCase {
  constructor(private tripRepository: TripRepository, private userRepository: UserRepository) { }
  
  async execute({ userId, trip }: AddUserTripDTO): Promise<Trip> {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new UserNotExistsError()
    }

    return this.tripRepository.addUserTrip(trip, userId);
  }
}
