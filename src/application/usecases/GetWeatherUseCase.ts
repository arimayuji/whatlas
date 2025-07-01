import { GoogleApiGateway } from "../gateways/GoogleApiGateway";

interface GetWeatherUseCaseDTO {
  latitude: number;
  longitude: number;
}

export class GetWheaterUseCase {
  constructor(private readonly googleApi: GoogleApiGateway) {}

  async execute({  latitude, longitude }: GetWeatherUseCaseDTO) {
    return this.googleApi.getWeatherByLatLng({ latitude, longitude });
  }
}
