import { FastifyRequest, FastifyReply } from "fastify";
import { handleError } from "../../utils/handle-error";
import { GoogleApiGateway } from "../../application/gateways/GoogleApiGateway";
import { GetTransitRouteType } from "../../application/@types/google-gateway.type";

export class GoogleApiController {
  constructor(private readonly googleApi: GoogleApiGateway) {}

  async getDirectionsRoute(
    request: FastifyRequest<{
      Body: GetTransitRouteType
    }>,
    reply: FastifyReply
  ) {
    try {
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

      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async geocodeAddress(
    request: FastifyRequest<{ Querystring: { address: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { address } = request.query;
      const data = await this.googleApi.geocodeAddress(address);
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async getWeather(
    request: FastifyRequest<{ Querystring: { latitude: number; longitude: number } }>,
    reply: FastifyReply
  ) {
    try {
      const { latitude, longitude } = request.query;
      const data = await this.googleApi.getWeatherByLatLng({ latitude, longitude });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async searchPlace(
    request: FastifyRequest<{
      Querystring: { query: string; latitude?: number; longitude?: number };
    }>,
    reply: FastifyReply
  ) {
    try {
      const { query, latitude, longitude } = request.query;
      const data = await this.googleApi.searchPlace(
        query,
        latitude && longitude ? { latitude, longitude } : undefined
      );
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }
}
