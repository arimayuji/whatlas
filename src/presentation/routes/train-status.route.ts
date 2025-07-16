import { FastifyTypedInstance } from "../../@types/fastify.types";
import { z } from "zod/v4";
import { TrainStatusController } from "../controllers/train-status.controller";
import { FastifyRequest } from "fastify";
import { ResponseSuccessSchema } from "../../utils/responseSuccess";
import { ZOD_ERRORS_MESSAGES } from "../../utils/error-messages";

export async function trainsStatusRoute(
  app: FastifyTypedInstance,
  controller: TrainStatusController
) {
  app.get(
    "/train/status",
    {
      schema: {
        tags: ["train"],
        description: "Listar status atual de todas as linhas de metro/trem",
        response: {
          200: ResponseSuccessSchema
        }
      },
    },
   (req,res) => controller.findAll(req, res)
  );

  app.get(
    "/train/status/:name",
    {
      schema: {
        tags: ["train"],
        description: "Buscar status de uma linha de metro/trem pelo nome",
        params: {
          name: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]})
        },
        response: {
          200: ResponseSuccessSchema
        }
      },
    },
    (req:  FastifyRequest<{ Params: { name: string }}>, res) => controller.findByName(req, res)
  );
}
