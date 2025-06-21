import { z } from "zod/v4";
import { FastifyTypedInstance } from "../@types/fastify.types";
import { googleApiController } from "../controllers/google.controller";

export async function googleApiRoutes(app: FastifyTypedInstance) {
  app.get(
    "/google/directions",
    {
      schema: {
        tags: ["google"],
        querystring: z.object({
          origin: z.string(),
          destination: z.string(),
        }),
      },
    },
    googleApiController.getDirections
  );

  app.get(
    "/google/geocode",
    {
      schema: {
        tags: ["google"],
        querystring: z.object({
          address: z.string(),
        }),
      },
    },
    googleApiController.geocodeAddress
  );

  app.get(
    "/google/weather",
    {
      schema: {
        tags: ["google"],
        querystring: z.object({
          lat: z.coerce.number(),
          lng: z.coerce.number(),
        }),
      },
    },
    googleApiController.getWeather
  );

  app.get(
    "/google/place-search",
    {
      schema: {
        tags: ["google"],
        querystring: z.object({
          query: z.string(),
          lat: z.coerce.number().optional(),
          lng: z.coerce.number().optional(),
        }),
      },
    },
    googleApiController.searchPlace
  );
}
