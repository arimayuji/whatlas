import { Location } from "../../domain/entities/location.model";
import { InvalidDestinationError } from "../../domain/errors/InvalidDestinationError";
import { InvalidMarginMinutesError } from "../../domain/errors/InvalidMarginMinutesError";
import { MoreThanFifteenMinutesInMarginError } from "../../domain/errors/MoreThanFifteenMinutesInMarginError";
import { MoreThanThreeDestinationsError } from "../../domain/errors/MoreThanThreeDestinationsError";
import { UserNotExistsError } from "../../domain/errors/UserNotExistsError";
import { UserRepository } from "../../domain/repositories/UserRepository";

interface UpdateUserDTO {
  marginInMinutes?: number;
  id: string;
  defaultOrigin?: Location;
  destinations?: Location[];
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ defaultOrigin, destinations, marginInMinutes, id }: UpdateUserDTO) {
    const existing = await this.userRepository.findById(id);

    if (!existing) throw new UserNotExistsError();

    if (marginInMinutes && marginInMinutes > 15) {
      throw new MoreThanFifteenMinutesInMarginError();
    }

    if(marginInMinutes && marginInMinutes < 0) {
      throw new InvalidMarginMinutesError();
    }

    if (destinations && destinations.length > 3) {
      throw new MoreThanThreeDestinationsError();
    }

    if (destinations && destinations.some((destination) => !destination.label|| !destination.latitude || !destination.longitude)) {
      throw new InvalidDestinationError();
    }


    return this.userRepository.update(
      id,
      {
        defaultOrigin: defaultOrigin ? {
          ...defaultOrigin
        } : existing.defaultOrigin,
        destinations : destinations ? destinations.map((destination) => ({
          ...destination
          })): existing.destinations,
        marginInMinutes: marginInMinutes ? marginInMinutes : existing.marginInMinutes,
        updatedAt: new Date().toISOString(),
      }
    )
     
  }
}
