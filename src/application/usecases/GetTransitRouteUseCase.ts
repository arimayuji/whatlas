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
    routeModifiers,
    extraComputations,
    computeAlternateRoutes,
    intermediates,
    polylineQuality,
    polylineEncoding,
    routingPreference,
    languageCode,
    regionCode,
    units,
    optimizeWaypointOrder,
    requestedReferenceRoutes
  }: GetTransitRouteType) {
    return this.googleApiGateway.getTransitRoute({
      destination,
      origin,
      travelMode,
      departureTime,  
      arrivalTime,
      trafficModel,
      transitPreferences,
      intermediates,
      computeAlternateRoutes,
      routingPreference,
      polylineQuality,
      polylineEncoding,
      routeModifiers,
      extraComputations,
      languageCode,
      regionCode,
      optimizeWaypointOrder,
      requestedReferenceRoutes,
      units
    });
  }
}