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
      travelMode,
      departureTime,
      arrivalTime,
      transitPreferences,
      intermediates,
      computeAlternateRoutes,
      optimizeWaypointOrder,
    } = request.body;

    const data = await this.googleApi.getTransitRoute(
      {
        destination,
        origin,
        travelMode,
        departureTime,
        arrivalTime,
        transitPreferences,
        intermediates,
        computeAlternateRoutes,
        optimizeWaypointOrder,
      },
    );

    return responseSuccess(reply, {data,message: "Route calculated",code: 200});
  }

  async geocodeAddress(
    request: FastifyRequest<{ Querystring: { address: string } }>,
    reply: FastifyReply
  ) {
    const { address } = request.query;

    const data = await this.googleApi.geocodeAddress(address);

    return responseSuccess(reply, {data,message: "Founded address",code: 200});
  }

  async getWeather(
    request: FastifyRequest<{ Querystring: { latitude: number; longitude: number } }>,
    reply: FastifyReply
  ) {
    const { latitude, longitude } = request.query;

    const data = await this.googleApi.getWeatherByLatLng({ latitude, longitude });

    return responseSuccess(reply, {data,message: "Founded weather",code: 200});
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
    return responseSuccess(reply, {data,message: "Founded place",code: 200});
  }
}