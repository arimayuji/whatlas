import { FastifyRequest, FastifyReply } from "fastify";
import { GoogleApiGateway } from "../../application/gateways/GoogleApiGateway";
import { GetTransitRouteType } from "../../application/@types/google-gateway.type";
import { responseSuccess } from "../../utils/responseSuccess";

export class GoogleApiController {
  constructor(private readonly googleApi: GoogleApiGateway) { }

  async getDirectionsRoute(
    request: FastifyRequest<{
      Body: GetTransitRouteType
    }>,
    reply: FastifyReply
  ) {
    const {
      destination,
      origin,
      routeModifiers,
      travelMode,
      departureTime,
      arrivalTime,
      trafficModel,
      transitPreferences,
      intermediates,
      routingPreference,
      computeAlternateRoutes,
      extraComputations,
      languageCode,
      regionCode,
      optimizeWaypointOrder,
      requestedReferenceRoutes,
      units,
      polylineQuality,
      polylineEncoding,
    } = request.body;

    const data = await this.googleApi.getTransitRoute(
      {
        destination,
        origin,
        routeModifiers,
        travelMode,
        departureTime,
        arrivalTime,
        trafficModel,
        transitPreferences,
        intermediates,
        routingPreference,
        computeAlternateRoutes,
        extraComputations,
        languageCode,
        regionCode,
        optimizeWaypointOrder,
        requestedReferenceRoutes,
        units,
        polylineQuality,
        polylineEncoding,
      }
    );

    return responseSuccess(reply, data, "Route calculated", 200);
  }

  async geocodeAddress(
    request: FastifyRequest<{ Querystring: { address: string } }>,
    reply: FastifyReply
  ) {
    const { address } = request.query;
    const data = await this.googleApi.geocodeAddress(address);
    return responseSuccess(reply, data, "Founded address", 200);
  }

  async getWeather(
    request: FastifyRequest<{ Querystring: { latitude: number; longitude: number } }>,
    reply: FastifyReply
  ) {
    const { latitude, longitude } = request.query;
    const data = await this.googleApi.getWeatherByLatLng({ latitude, longitude });
    return responseSuccess(reply, data, "Founded weather", 200);
  }

  async searchPlace(
    request: FastifyRequest<{
      Querystring: { query: string; latitude?: number; longitude?: number };
    }>,
    reply: FastifyReply
  ) {
    const { query, latitude, longitude } = request.query;
    const data = await this.googleApi.searchPlace(
      query,
      latitude && longitude ? { latitude, longitude } : undefined
    );
    return responseSuccess(reply, data, "Founded place", 200);
  }
}