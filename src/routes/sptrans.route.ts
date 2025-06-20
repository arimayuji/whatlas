import { FastifyTypedInstance } from "../@types/fastify.types";
import { z } from "zod/v4";
import { sptransService } from "../services/sptrans.service";
import { SpTransCorredorResponseModel } from "../models/sptrans-corredor.model";
import { SpTransStopResponseModel } from "../models/sptrans-stop.model";
import { LinePositionResponseModel } from "../models/sptrans-position.model";
import { LineVehiclesPositionsModel } from "../models/sptrans-vehicle.model";
import { SpTransLinesModel } from "../models/sptrans-line.model";
import { LineStopETAModel } from "../models/sptrans-eta-stopline.model";
import { SptransCompanyResponseModel } from "../models/sptrans-company.model";
export async function sptransRoutes(app: FastifyTypedInstance) {
  app.get("/sptrans/companies", {
    schema: {
      tags: ["sptrans"],
      description: "List all SPTrans companies",
      response: {
        200: SptransCompanyResponseModel,
      },
    },
    handler: async () => await sptransService.getCompanies(),
  });

  app.get("/sptrans/corredores", {
    schema: {
      tags: ["sptrans"],
      description: "List all SPTrans corridors",
      response: { 200: SpTransCorredorResponseModel },
    },
    handler: async () => await sptransService.getCorredores(),
  });

  app.get("/sptrans/lines/search", {
    schema: {
      tags: ["sptrans"],
      description: "Search lines by term",
      querystring: z.object({ termosBusca: z.string() }),
      response: { 200: SpTransLinesModel },
    },
    handler: async (request) => {
      const { termosBusca } = request.query;
      return sptransService.searchLines(termosBusca);
    },
  });

  app.get("/sptrans/lines/search-direction", {
    schema: {
      tags: ["sptrans"],
      description: "Search lines by term and direction",
      querystring: z.object({
        termosBusca: z.string(),
        sentido: z.enum(["1", "2"]).transform(Number),
      }),
      response: { 200: SpTransLinesModel },
    },
    handler: async (request) => {
      const { termosBusca, sentido } = request.query;
      return sptransService.searchLineWithDirection(
        termosBusca,
        sentido as 1 | 2
      );
    },
  });

  app.get("/sptrans/stops/search", {
    schema: {
      tags: ["sptrans"],
      description: "Search stops by term",
      querystring: z.object({ termosBusca: z.string() }),
      response: { 200: SpTransStopResponseModel },
    },
    handler: async (request) => {
      return sptransService.getStopsByTerm(request.query.termosBusca);
    },
  });

  app.get("/sptrans/stops/line/:codigoLinha", {
    schema: {
      tags: ["sptrans"],
      description: "Get stops by line code",
      params: z.object({ codigoLinha: z.string().transform(Number) }),
      response: { 200: SpTransStopResponseModel },
    },
    handler: async (request) => {
      return sptransService.getStopsByLine(request.params.codigoLinha);
    },
  });

  app.get("/sptrans/vehicles/positions", {
    schema: {
      tags: ["sptrans"],
      description: "Get all vehicle positions",
      response: {
        200: LinePositionResponseModel,
      },
    },
    handler: async () => await sptransService.getVehiclePositions(),
  });

  app.get("/sptrans/vehicles/line/:codigoLinha", {
    schema: {
      tags: ["sptrans"],
      description: "Get vehicle positions by line",
      params: z.object({ codigoLinha: z.string().transform(Number) }),
      response: {
        200: LineVehiclesPositionsModel,
      },
    },
    handler: async (request) =>
      await sptransService.getVehiclePositionsByLine(
        request.params.codigoLinha
      ),
  });

  app.get("/sptrans/arrivals/:stopCode/:lineCode", {
    schema: {
      tags: ["sptrans"],
      description: "Get arrival prediction by stop and line",
      params: z.object({
        stopCode: z.string().transform(Number),
        lineCode: z.string().transform(Number),
      }),
      response: { 200: LineStopETAModel },
    },
    handler: async (req) => {
      return sptransService.getArrivalPrediction(
        req.params.stopCode,
        req.params.lineCode
      );
    },
  });
}
