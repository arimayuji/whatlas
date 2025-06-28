import { FastifyRequest, FastifyReply } from "fastify";
import { handleError } from "../../utils/handle-error";
import { GoogleApiGateway } from "../../application/gateways/GoogleApiGateway";
import { RoutesPostData } from "../@types/google-routes.type";

export class GoogleApiController {
  constructor(private readonly googleApi: GoogleApiGateway) {}

  async getDirectionsRoute(
    request: FastifyRequest<{
      Body: RoutesPostData
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
        arrival_time,
        departure_time,
        computeAlternativeRoutes,
        intermediates
      } = request.body;

      const data = await this.googleApi.getTransitRoute(
        {
          destination: {
           latitude: parseFloat(destination_lat),
           longitude: parseFloat(destination_lng),
          },
          origin: {
            latitude: parseFloat(origin_lat),
            longitude: parseFloat(origin_lng),
          },
          travelMode,
          computeAlternativeRoutes: computeAlternativeRoutes,
          departureTime: departure_time ? departure_time : undefined,
          arrivalTime: arrival_time ? arrival_time : undefined,
          intermediates: intermediates?.map((intermediate) => ({
            placeId: intermediate.placeId,
            address: intermediate.address,
            vehicleStopOver: intermediate.vehicleStopOver ?? false,
            via: intermediate.via ?? false,
            sideOfRoad: intermediate.sideOfRoad ?? false,
            location: {
              latLng: {
                latitude: intermediate.location.latLng.latitude,        
                longitude: intermediate.location.latLng.longitude,
              },
            },
          }))
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
