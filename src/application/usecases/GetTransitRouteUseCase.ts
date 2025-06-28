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
    trafficModel,
    transitPreferences,
    computeAlternativeRoutes,
    intermediates,
  }: GetTransitRouteType) {
    return this.googleApiGateway.getTransitRoute({
      computeAlternativeRoutes, 
      destination,
      origin,
      travelMode,
      departureTime,  
      arrivalTime,
      trafficModel,
      transitPreferences,
      intermediates,
    });
  }
}