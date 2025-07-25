import { logger } from "../../infra/logger";
import { GoogleApiGateway } from "../gateways/GoogleApiGateway";

interface GetWeatherUseCaseDTO {
  latitude: number;
  longitude: number;
}

export class GetWheaterUseCase {
  constructor(private readonly googleApi: GoogleApiGateway) {}

  async execute({  latitude, longitude }: GetWeatherUseCaseDTO) {
    const weather = await this.googleApi.getWeatherByLatLng({ latitude, longitude });

    logger.info('[Weather] Weather fetched', { weather })
    
    return weather
  }
}
