import { BusRepository } from "../../domain/repositories/BusRepository";

interface GetBusLineStopsDTO {
  busline:string;
}

export class GetBusLineStopsUseCase {
  constructor(private busRepository: BusRepository) {}
  async execute({ busline }: GetBusLineStopsDTO) {
    return this.busRepository.getAllStopsOfBusLine(busline);
  }
}