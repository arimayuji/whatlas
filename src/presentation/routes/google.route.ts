import { z } from "zod/v4";
import { FastifyTypedInstance } from "../../@types/fastify.types";
import { GoogleApiController } from "../controllers/google.controller";
import { FastifyRequest, FastifyReply } from "fastify";
import {
  GeocodeQuery,
  geocodeQuerySchema,
  PlaceSearchQuery,
  placeSearchQuerySchema,
  WeatherQuery,
  weatherQuerySchema,
  RoutesPostData,
  routesPostSchema,
} from "../@types/google-routes.type";

export async function googleApiRoutes(
  app: FastifyTypedInstance,
  controller: GoogleApiController
) {
  app.post(
    "/google/directions/route",
    {
      schema: {
        tags: ["google"],
        body:routesPostSchema,
        response: {
          200: z.object({
            route: z.any(),
            staticMapUrls: z.array(z.string()),
          }),
        },
      },
    },
    (
      req: FastifyRequest<{Body:RoutesPostData }>,
      res: FastifyReply
    ) => controller.getDirectionsRoute(req, res)
  )

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
