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
          lat: parseFloat(origin_lat),
          lng: parseFloat(origin_lng),
        },
        {
          lat: parseFloat(destination_lat),
          lng: parseFloat(destination_lng),
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
    request: FastifyRequest<{ Querystring: { lat: number; lng: number } }>,
    reply: FastifyReply
  ) {
    try {
      const { lat, lng } = request.query;
      const data = await this.googleApi.getWeatherByLatLng({ lat, lng });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async searchPlace(
    request: FastifyRequest<{
      Querystring: { query: string; lat?: number; lng?: number };
    }>,
    reply: FastifyReply
  ) {
    try {
      const { query, lat, lng } = request.query;
      const data = await this.googleApi.searchPlace(
        query,
        lat && lng ? { lat, lng } : undefined
      );
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }
}
