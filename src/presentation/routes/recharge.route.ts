import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyTypedInstance } from "../../@types/fastify.types";
import { RechargeModelSchema } from "../../domain/entities/recharge.model";
import { ZOD_ERRORS_MESSAGES } from "../../utils/error-messages";
import { RechargeController } from "../controllers/recharge.controller";
import { z } from "zod/v4";

export async function rechargeRoute(
  app: FastifyTypedInstance,
  controller: RechargeController
) {
  app.get(
      "/recharges/:userId",
      {
        schema: {
          tags: ["recharges"],
          description: "Get recharges by user ID",
          params: z.object({
            userId: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]}),
          }),
          response: {
            200: z.array(RechargeModelSchema),
          },
        },
      },
     (req: FastifyRequest<{Params : {userId: string}}>, res: FastifyReply) => controller.getRechargeHistory(req, res)
    ),
  app.post(
      "/recharges/:userId",
      {
        schema: {
          tags: ["recharges"],
          description: "Recharge a user's card",
          params: z.object({
            userId: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]}),
          }),
          body: z.object({
            recharge: z.number().nonnegative({error: ZOD_ERRORS_MESSAGES["number.nonnegative"]}),
          }),
          response: {
            200: RechargeModelSchema,
          },
        },
      },
      (req: FastifyRequest<{Params : {userId: string}, Body: {recharge: number}}>, res: FastifyReply) => controller.rechargeCard(req, res)
    ),
    app.delete(
      "/recharges/:userId/:rechargeId",
      {
        schema: {
          tags: ["recharges"],
          description: "Delete a recharge by ID",
          params: z.object({
            userId: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]}),
            rechargeId: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]}),
          }),
        },
      },
      (req: FastifyRequest<{Params : {userId: string, rechargeId: string}}>, res: FastifyReply) => controller.deleteRecharge(req, res)
    )
}