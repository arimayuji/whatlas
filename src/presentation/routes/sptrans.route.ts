import { FastifyTypedInstance } from "../../@types/fastify.types";
import { z } from "zod/v4";
import { SpTransController } from "../controllers/sptrans.controller";
import { FastifyReply, FastifyRequest } from "fastify";
import { ResponseSuccessSchema } from "../../utils/responseSuccess";

export async function sptransRoutes(
  app: FastifyTypedInstance,
  controller: SpTransController
) {
  app.get("/sptrans/companies", {
    schema: {
      tags: ["sptrans"],
      description: "List all SPTrans companies",
      response: { 200: ResponseSuccessSchema},
    },
  },
    (req: FastifyRequest, res: FastifyReply) => controller.getCompanies(req, res)
  );

  app.get("/sptrans/corredores", {
    schema: {
      tags: ["sptrans"],
      description: "List all SPTrans corridors",
      response: { 200: ResponseSuccessSchema},
    },
  },
    (req: FastifyRequest, res: FastifyReply) => controller.getCorredores(req, res)
  );

  app.get("/sptrans/lines/search", {
    schema: {
      tags: ["sptrans"],
      description: "Search lines by term",
      querystring: z.object({ termosBusca: z.string() }),
      response: { 200: ResponseSuccessSchema},
    },
  },
    (req:FastifyRequest<{ Querystring: { termosBusca: string } }>, res: FastifyReply) => controller.searchLines(req, res)
  );

  app.get("/sptrans/lines/search-direction", {
    schema: {
      tags: ["sptrans"],
      description: "Search lines by term and direction",
      querystring: z.object({
        termosBusca: z.string(),
        sentido: z.enum(["1", "2"]).transform(Number),
      }),
      response : {200: ResponseSuccessSchema},
    },
  },
    (req: FastifyRequest<{
      Querystring: { termosBusca: string; sentido: 1 | 2 };
    }>, res: FastifyReply) => controller.searchLineWithDirection(req, res)
  );

  app.get("/sptrans/stops/search", {
    schema: {
      tags: ["sptrans"],
      description: "Search stops by term",
      querystring: z.object({ termosBusca: z.string() }),
      response: { 200:ResponseSuccessSchema},
    },
  },
    (req: FastifyRequest<{ Querystring: { termosBusca: string } }>, res: FastifyReply) => controller.searchLines(req, res)
  );

  app.get("/sptrans/stops/line/:codigoLinha", {
    schema: {
      tags: ["sptrans"],
      description: "Get stops by line code",
      params: z.object({ codigoLinha: z.string().transform(Number) }),
      response: { 200:ResponseSuccessSchema},
    },
  },
    (req: FastifyRequest<{ Params: { codigoLinha: number } }>, res: FastifyReply) => controller.getStopsByLine(req, res)
  );

  app.get("/sptrans/vehicles/positions", {
    schema: {
      tags: ["sptrans"],
      description: "Get all vehicle positions",
      response: { 200:ResponseSuccessSchema},
    },
  },
    (req: FastifyRequest, res: FastifyReply) => controller.getVehiclePositions(req, res)
  );

  app.get("/sptrans/vehicles/line/:codigoLinha", {
    schema: {
      tags: ["sptrans"],
      description: "Get vehicle positions by line",
      params: z.object({ codigoLinha: z.string().transform(Number) }),
      response: { 200:ResponseSuccessSchema},
    },
  },
    (req: FastifyRequest<{ Params: { codigoLinha: number } }>, res: FastifyReply) => controller.getVehiclePositionsByLine(req, res)
  );

  app.get("/sptrans/arrivals/:stopCode/:lineCode", {
    schema: {
      tags: ["sptrans"],
      description: "Get arrival prediction by stop and line",
      params: z.object({
        stopCode: z.string().transform(Number),
        lineCode: z.string().transform(Number),
      }),
      response: { 200:ResponseSuccessSchema},
    },
  },
    (req: FastifyRequest<{ Params: { stopCode: number; lineCode: number } }>, res: FastifyReply) => controller.getArrivalPredictionsByStop(req, res)
  );
}
