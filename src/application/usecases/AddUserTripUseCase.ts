import { Trip } from "../../domain/entities/trip.model";
import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { TripRepository } from "../../domain/repositories/TripRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { logger } from "../../infra/logger";

interface AddUserTripDTO {
  userId: string;
  trip: Trip;
}

export class AddUserTripUseCase {
  constructor(
    private tripRepository: TripRepository,
    private userRepository: UserRepository
  ) {}

  async execute({ userId, trip }: AddUserTripDTO): Promise<Trip> {
    logger.info(`[Trip] Attempting to add trip for user ${userId}`, {
      destination: trip.destination,
      createdAt: trip.createdAt,
    });

    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      logger.warn(`[Trip] User ${userId} not found, cannot add trip`);
      throw new UserNotExistsError();
    }

    const savedTrip = await this.tripRepository.addUserTrip(trip, userId);

    logger.info(`[Trip] Trip added successfully for user ${userId}`, {
      tripId: savedTrip.id,
      destination: savedTrip.destination,
    });

    return savedTrip;
  }
}
