import { z } from "zod/v4";
import { FastifyTypedInstance } from "../../@types/fastify.types";
import { GoogleApiController } from "../controllers/google.controller";
import { FastifyRequest, FastifyReply } from "fastify";

const directionsQuerySchema = z.object({
  origin_lat: z.string(),
  origin_lng: z.string(),
  destination_lat: z.string(),
  destination_lng: z.string(),
  travelMode: z.enum(["TRANSIT", "WALK", "BICYCLE"]),
});

const geocodeQuerySchema = z.object({
  address: z.string(),
});

const weatherQuerySchema = z.object({
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

const placeSearchQuerySchema = z.object({
  query: z.string(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
});

type DirectionsQuery = z.infer<typeof directionsQuerySchema>;
type GeocodeQuery = z.infer<typeof geocodeQuerySchema>;
type WeatherQuery = z.infer<typeof weatherQuerySchema>;
type PlaceSearchQuery = z.infer<typeof placeSearchQuerySchema>;

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
