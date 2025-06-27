import { FastifyRequest, FastifyReply } from "fastify";
import { handleError } from "../../utils/handle-error";
import { GoogleApiGateway } from "../../application/gateways/GoogleApiGateway";

export class GoogleApiController {
  constructor(private readonly googleApi: GoogleApiGateway) {}

  async getDirections(
    request: FastifyRequest<{
      Querystring: {
        origin_lat: string;
        origin_lng: string;
        destination_lat: string;
        destination_lng: string;
        travelMode: "TRANSIT" | "WALK" | "BICYCLE";
      };
    }>,
    reply: FastifyReply
  ) {
    try {
      const {
        origin_lat,
        origin_lng,
        destination_lat,
        destination_lng,
        travelMode,
      } = request.query;

      const data = await this.googleApi.getTransitRoute(
        {
          latitude: parseFloat(origin_lat),
          longitude: parseFloat(origin_lng),
        },
        {
          latitude: parseFloat(destination_lat),
          longitude: parseFloat(destination_lng),
        },
        travelMode
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
