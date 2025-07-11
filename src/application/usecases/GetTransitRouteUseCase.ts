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
    return this.googleApiGateway.getTransitRoute({
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
  }
}