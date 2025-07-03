import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyTypedInstance } from "../../@types/fastify.types";
import { UserCardBalanceController } from "../controllers/user-card-balance.controller";
import { z } from "zod/v4";
import { ZOD_ERRORS_MESSAGES } from "../../utils/error-messages";

export async function userCardBalanceRoutes(
  app: FastifyTypedInstance,
  controller: UserCardBalanceController
) {
  app.get(
    "/user-card-balance/:userId",
    {
      schema: {
        tags: ["user-card-balance"],
        description: "Get user card balance",
        params: z.object({
          userId: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]}),
        })
      },
    },
   (req : FastifyRequest<{ Params: { userId: string } }>, res : FastifyReply) =>  controller.getUserCardBalance(req, res)
  );

  app.get(
    "/user-card-balance/:userId/remaining-tickets",
    {
      schema: {
        tags: ["user-card-balance"],
        description: "Get remaining tickets",
        params: z.object({
          userId: z.string().nonempty({ error: ZOD_ERRORS_MESSAGES["string.nonempty"] }),
        })
      },
    },
   (req: FastifyRequest<{ Params: { userId: string } }>, res : FastifyReply) => controller.getRemainingTickets(req, res)
  );

  app.patch(
    "/user-card-balance/:userId",
    {
      schema: {
        tags: ["user-card-balance"],
        description: "Update user card balance",
        params: z.object({
          userId: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]}),
        }),
        body: z.object({
          currentBalance: z.number(),
          updatedAt: z.string(),
        }),
      },
    },
   (req : FastifyRequest<{ Params: { userId: string }, Body: { currentBalance: number, updatedAt: string } }>,res : FastifyReply) => controller.updateUserCardBalance(req, res)
  )
}