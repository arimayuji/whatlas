import { FastifyReply, FastifyRequest } from "fastify";
import { GoogleApiService } from "../services/google.service";
import { handleError } from "../utils/handle-error";

export const googleApiController = {
  async getDirections(
    request: FastifyRequest<{
      Querystring: { origin: string; destination: string };
    }>,
    reply: FastifyReply
  ) {
    try {
      const { origin, destination } = request.query;
      const data = await GoogleApiService.getTransitRoute(origin, destination);
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async geocodeAddress(
    request: FastifyRequest<{ Querystring: { address: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { address } = request.query;
      const data = await GoogleApiService.geocodeAddress(address);
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async getWeather(
    request: FastifyRequest<{ Querystring: { lat: number; lng: number } }>,
    reply: FastifyReply
  ) {
    try {
      const { lat, lng } = request.query;
      const data = await GoogleApiService.getWeatherByLatLng(lat, lng);
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async searchPlace(
    request: FastifyRequest<{
      Querystring: { query: string; lat?: number; lng?: number };
    }>,
    reply: FastifyReply
  ) {
    try {
      const { query, lat, lng } = request.query;
      const data = await GoogleApiService.searchPlace(
        query,
        lat && lng ? { lat, lng } : undefined
      );
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },
};
