import { GoogleApiGateway } from "../gateways/GoogleApiGateway";

interface GetGeocodeDTO {
  address: string;
}

export class GetWheaterUseCase {
  constructor(private readonly googleApi: GoogleApiGateway) {}

  async execute({ address }: GetGeocodeDTO) {
    return this.googleApi.geocodeAddress(address);
  }
}
