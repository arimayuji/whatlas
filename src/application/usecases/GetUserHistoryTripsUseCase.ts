import { Trip } from "../../domain/entities/trip.model";
import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { TripRepository } from "../../domain/repositories/TripRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";

interface GetUserHistoryTripsDTO {
  userId: string;
}

export class GetUserHistoryTripsUseCase {
  constructor(private tripRepository: TripRepository, private userRepository: UserRepository) { }
  
  async execute({ userId }:  GetUserHistoryTripsDTO): Promise<Trip[]> {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new UserNotExistsError()
    }

    const trips = await this.tripRepository.getUserHistoryTrips(userId);

    return trips
  }
}
