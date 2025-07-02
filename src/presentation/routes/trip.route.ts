import { FastifyTypedInstance } from "../../@types/fastify.types";
import { TripModel } from "../../domain/entities/trip.model";
import { TripController } from "../controllers/trip.controller";
import { z } from "zod/v4";

export async function tripRoute(
  app: FastifyTypedInstance,
  tripController: TripController
) {
  app.get(
    "/trips",
    {
      schema: {
        tags: ["trips"],
        description: "List all trips",
        response: {
          200: z.array(TripModel),
        },
      },
    },
    tripController.getUserHistoryTrips
  ),
  app.post(
      "/trips/:userId",
      {
        schema: {
          tags: ["trips"],
          description: "Create a new trip",
          params: z.object({
            userId: z.string().nonempty(),
          }),
          body: TripModel,
          response: {
            200: TripModel,
          },
        }
      },
      tripController.addTrip
    ),
    app.delete(
      "/trips/:userId/:tripId",
      {
        schema: {
          tags: ["trips"],
          description: "Delete a trip",
          params: z.object({
            userId: z.string().nonempty(),
            tripId: z.string().nonempty(),
          }),
          response: {
            200: TripModel,
          },
        }
      },
      tripController.deleteTrip
    )
}