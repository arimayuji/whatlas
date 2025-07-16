import { FastifyTypedInstance } from "../../@types/fastify.types";
import { z } from "zod/v4";
import { TrainStatusController } from "../controllers/train-status.controller";
import { FastifyRequest } from "fastify";
import { ResponseSuccessSchema } from "../../utils/responseSuccess";

export async function trainsStatusRoute(
  app: FastifyTypedInstance,
  controller: TrainStatusController
) {
  app.get(
    "/trens/status",
    {
      schema: {
        tags: ["trens"],
        description: "Listar status atual de todas as linhas de metro/trem",
        response: {
          200: ResponseSuccessSchema
        }
      },
    },
   (req,res) => controller.findAll(req, res)
  );

  app.get(
    "/trens/status",
    {
      schema: {
        tags: ["trens"],
        description: "Buscar status de uma linha de metro/trem pelo nome",
        querystring: z.object({
          name: z.string(),
        }),
        response: {
          200: ResponseSuccessSchema
        }
      },
    },
    (req:  FastifyRequest<{ Querystring: { name: string }}>, res) => controller.findByName(req, res)
  );
}
