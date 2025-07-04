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
} from "../@types/google-routes.type";

import {getTransitRouteSchema, GetTransitRouteType } from "../../application/@types/google-gateway.type";
import { ResponseSuccessSchema } from "../../utils/responseSuccess";

export async function googleApiRoutes(
  app: FastifyTypedInstance,
  controller: GoogleApiController
) {
  app.post(
    "/google/directions/route",
    {
      schema: {
        tags: ["google"],
        body: getTransitRouteSchema,
        response: {
          200: ResponseSuccessSchema,
        },
      },
    },
    (
      req: FastifyRequest<{Body:GetTransitRouteType }>,
      res: FastifyReply
    ) => controller.getDirectionsRoute(req, res)
  )

  app.get(
    "/google/geocode",
    {
      schema: {
        tags: ["google"],
        querystring: geocodeQuerySchema,
        response: {
          200: ResponseSuccessSchema,
        },
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
        response: {
          200: ResponseSuccessSchema,
        },
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
        response: {
          200: ResponseSuccessSchema,
        },
      },
    },
    (
      req: FastifyRequest<{ Querystring: PlaceSearchQuery }>,
      res: FastifyReply
    ) => controller.searchPlace(req, res)
  );
}
