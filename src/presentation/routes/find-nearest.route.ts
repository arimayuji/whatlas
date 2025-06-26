import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyTypedInstance } from "../../@types/fastify.types";
import { FindNearestStopController } from "../controllers/find-nearest-stop.controller";
import { FindNearestQuery, findNearestQuerySchema } from "../@types/find-nearest.type";

export async function findNearestStopRoutes(
  app: FastifyTypedInstance,
  controller: FindNearestStopController 
) {
  app.get(
    "/find-nearest-stop",
    {
      schema: {
        tags: ["find-nearest-stop"],
        querystring: findNearestQuerySchema,
      },
    },
    (req: FastifyRequest<{ Querystring: FindNearestQuery }>, res: FastifyReply) => controller.handle(req, res)
  );
}