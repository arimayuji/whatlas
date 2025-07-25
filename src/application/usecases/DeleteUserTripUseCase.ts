import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { TripRepository } from "../../domain/repositories/TripRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { logger } from "../../infra/logger";

interface DeleteUserTripDTO {
  userId: string;
  tripId: string;
}

export class DeleteUserTripUseCase {
  constructor(private tripRepository: TripRepository, private userRepository: UserRepository) { }
  
  async execute({ userId }: DeleteUserTripDTO): Promise<boolean> {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      logger.warn(`[Trip] User ${userId} not found, cannot delete trip`)
      throw new UserNotExistsError()
    }

    const tripExists = await this.tripRepository.getUserLastTrip(userId);

    if (!tripExists) {
      return false
    }

    await this.tripRepository.deleteUserTrip(tripExists.id, userId)

    logger.info(`[Trip] Trip deleted successfully for user ${userId}`, {
      tripId: tripExists.id,
      destination: tripExists.destination,
    });

    return true  
  }
}
