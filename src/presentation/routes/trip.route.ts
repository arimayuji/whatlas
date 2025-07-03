import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyTypedInstance } from "../../@types/fastify.types";
import { Trip, TripModelSchema } from "../../domain/entities/trip.model";
import { ZOD_ERRORS_MESSAGES } from "../../utils/error-messages";
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
          200: z.array(TripModelSchema),
        },
      },
    },
    (req: FastifyRequest<{Params : {userId: string}}>, res: FastifyReply) => tripController.getUserHistoryTrips(req, res)
  ),
  app.post(
      "/trips/:userId",
      {
        schema: {
          tags: ["trips"],
          description: "Create a new trip",
          params: z.object({
            userId: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]}),
          }),
          body: TripModelSchema,
          response: {
            200: TripModelSchema,
          },
        }
      },
    (req:FastifyRequest<{Params : {userId: string}, Body : {trip: Trip}}>, res: FastifyReply) => tripController.addTrip(req, res)
    ),
    app.delete(
      "/trips/:userId/:tripId",
      {
        schema: {
          tags: ["trips"],
          description: "Delete a trip",
          params: z.object({
            userId: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]}),
            tripId: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]}),
          }),
          response: {
            200: TripModelSchema,
          },
        }
      },
      (req:FastifyRequest<{Params : {userId: string, tripId: string}}>, res: FastifyReply) => tripController.deleteTrip(req, res)
    )
}