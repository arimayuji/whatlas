import { z } from "zod/v4";
import { FastifyTypedInstance } from "../../@types/fastify.types";
import { GoogleApiController } from "../controllers/google.controller";
import { FastifyRequest, FastifyReply } from "fastify";
import {
  DirectionsQuery,
  directionsQuerySchema,
  GeocodeQuery,
  geocodeQuerySchema,
  PlaceSearchQuery,
  placeSearchQuerySchema,
  WeatherQuery,
  weatherQuerySchema,
} from "../@types/google-routes.type";

export async function googleApiRoutes(
  app: FastifyTypedInstance,
  controller: GoogleApiController
) {
  app.get(
    "/google/directions",
    {
      schema: {
        tags: ["google"],
        querystring: directionsQuerySchema,
      },
    },
    (
      req: FastifyRequest<{ Querystring: DirectionsQuery }>,
      res: FastifyReply
    ) => controller.getDirections(req, res)
  );

  app.get(
    "/google/geocode",
    {
      schema: {
        tags: ["google"],
        querystring: geocodeQuerySchema,
      },
    },
    (req: FastifyRequest<{ Querystring: GeocodeQuery }>, res: FastifyReply) =>
      controller.geocodeAddress(req, res)
  );

  app.get(
    "/google/weather",
    {
      schema: {
        tags: ["google"],
        querystring: weatherQuerySchema,
      },
    },
    (req: FastifyRequest<{ Querystring: WeatherQuery }>, res: FastifyReply) =>
      controller.getWeather(req, res)
  );

  app.get(
    "/google/place-search",
    {
      schema: {
        tags: ["google"],
        querystring: placeSearchQuerySchema,
      },
    },
    (
      req: FastifyRequest<{ Querystring: PlaceSearchQuery }>,
      res: FastifyReply
    ) => controller.searchPlace(req, res)
  );
}
