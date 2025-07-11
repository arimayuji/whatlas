import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyTypedInstance } from "../../@types/fastify.types";
import { BusController } from "../controllers/bus.controller";
import { ResponseSuccessSchema } from "../../utils/responseSuccess";
import { BusLineStopsQuery, busLineStopsSchema, TerminalBusLinesQuery, terminalBusLinesSchema } from "../@types/bus.type";

export async function busRoutes(app: FastifyTypedInstance, controller: BusController) {
  app.get(
    "/bus-line-stops/:busline",
    {
      schema: {
        tags: ["bus"],
        querystring: busLineStopsSchema,
        response: {
          200: ResponseSuccessSchema
        }
      },
    },
    (req: FastifyRequest<{ Querystring: BusLineStopsQuery }>, res: FastifyReply) => controller.handleGetBusLineStopsUseCase(req, res)
  );

  app.get(
    "/terminal-bus-lines/:terminal",
    {
      schema: {
        tags: ["bus"],
        querystring: terminalBusLinesSchema,
        response: {
          200: ResponseSuccessSchema
        }
      },
    },
    (req: FastifyRequest<{ Querystring: TerminalBusLinesQuery }>, res: FastifyReply) => controller.handleGetTerminalBusLinesUseCase(req, res)
  );
}