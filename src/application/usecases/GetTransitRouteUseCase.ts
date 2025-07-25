import { logger } from "../../infra/logger";
import { GetTransitRouteType } from "../@types/google-gateway.type";
import { GoogleApiGateway } from "../gateways/GoogleApiGateway";

export class GetTransitRouteUseCase{
  constructor(private readonly googleApiGateway: GoogleApiGateway) { }
  
  async execute({
    destination,
    origin,
    travelMode,
    departureTime,  
    arrivalTime,
    transitPreferences,
    computeAlternateRoutes,
    intermediates,
    optimizeWaypointOrder,
  }: GetTransitRouteType) {
    const transitRoute = await this.googleApiGateway.getTransitRoute({
      destination,
      origin,
      travelMode,
      departureTime,  
      arrivalTime,
      transitPreferences,
      intermediates,
      computeAlternateRoutes,
      optimizeWaypointOrder,
    });

    if (!transitRoute) {
      return null
    }

    logger.info(`[TransitRoute] Transit route fetched successfully`, {
      transitRoute
    })

    return transitRoute
  }
}