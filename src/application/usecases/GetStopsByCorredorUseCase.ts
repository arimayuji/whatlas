import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetStopsByCorredorDTO {
  corredorCode: number
}

export class GetStopsByCorredorUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({corredorCode}: GetStopsByCorredorDTO) {
    return this.spTransApi.getStopsByCorredor(corredorCode)
  }
}
