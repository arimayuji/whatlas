import { FastifyTypedInstance } from "../../@types/fastify.types";
import { z } from "zod/v4";
import { TrainStatusController } from "../controllers/train-status.controller";
import { FastifyRequest } from "fastify";
import { ResponseSuccessSchema } from "../../utils/responseSuccess";

export async function trensStatusRoute(
  app: FastifyTypedInstance,
  controller: TrainStatusController
) {
  app.get(
    "/trens/status",
    {
      schema: {
        tags: ["trens"],
        description: "Listar status atual de todas as linhas de trem",
        response: {
          200: ResponseSuccessSchema
        }
      },
    },
   (req,res) => controller.findAll(req, res)
  );

  app.get(
    "/trens/status/:id",
    {
      schema: {
        tags: ["trens"],
        description: "Buscar status de uma linha de trem por ID",
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: ResponseSuccessSchema
        }
      },
    },
    (req:  FastifyRequest<{ Params: { id: string } }>, res) => controller.findById(req, res)
  );
}
