import { FastifyTypedInstance } from "../../@types/fastify.types";
import { TrainStatusController } from "../controllers/train-status.controller";
import { ResponseSuccessSchema } from "../../utils/responseSuccess";

export async function trainsStatusRoute(
  app: FastifyTypedInstance,
  controller: TrainStatusController
) {
  app.get(
    "/train/last-status",
    {
      schema: {
        tags: ["train"],
        description: "Listar status atual de todas as linhas de metro/trem",
        response: {
          200: ResponseSuccessSchema
        }
      },
    },
   (req,res) => controller.findTrainLastStatus(req, res)
  );
}
