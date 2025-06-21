import { FastifyTypedInstance } from "../@types/fastify.types";
import { z } from "zod/v4";
import { SptransCompanyResponseModel } from "../models/sptrans-company.model";
import { spTransController } from "../controllers/sptrans.controller";
import { SpTransCorredorResponseModel } from "../models/sptrans-corredor.model";
import { SpTransLinesModel } from "../models/sptrans-line.model";
import { SpTransStopResponseModel } from "../models/sptrans-stop.model";
import { LinePositionResponseModel } from "../models/sptrans-position.model";
import { LineStopETAModel } from "../models/sptrans-eta-stopline.model";
import { LineVehiclesPositionsModel } from "../models/sptrans-vehicle.model";

export async function sptransRoutes(app: FastifyTypedInstance) {
  app.get("/sptrans/companies", {
    schema: {
      tags: ["sptrans"],
      description: "List all SPTrans companies",
      response: { 200: SptransCompanyResponseModel },
    },
    handler: spTransController.getCompanies,
  });

  app.get("/sptrans/corredores", {
    schema: {
      tags: ["sptrans"],
      description: "List all SPTrans corridors",
      response: { 200: SpTransCorredorResponseModel },
    },
    handler: spTransController.getCorredores,
  });

  app.get("/sptrans/lines/search", {
    schema: {
      tags: ["sptrans"],
      description: "Search lines by term",
      querystring: z.object({ termosBusca: z.string() }),
      response: { 200: SpTransLinesModel },
    },
    handler: spTransController.searchLines,
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
    handler: spTransController.searchLineWithDirection,
  });

  app.get("/sptrans/stops/search", {
    schema: {
      tags: ["sptrans"],
      description: "Search stops by term",
      querystring: z.object({ termosBusca: z.string() }),
      response: { 200: SpTransStopResponseModel },
    },
    handler: spTransController.getStopsByTerm,
  });

  app.get("/sptrans/stops/line/:codigoLinha", {
    schema: {
      tags: ["sptrans"],
      description: "Get stops by line code",
      params: z.object({ codigoLinha: z.string().transform(Number) }),
      response: { 200: SpTransStopResponseModel },
    },
    handler: spTransController.getStopsByLine,
  });

  app.get("/sptrans/vehicles/positions", {
    schema: {
      tags: ["sptrans"],
      description: "Get all vehicle positions",
      response: { 200: LinePositionResponseModel },
    },
    handler: spTransController.getVehiclePositions,
  });

  app.get("/sptrans/vehicles/line/:codigoLinha", {
    schema: {
      tags: ["sptrans"],
      description: "Get vehicle positions by line",
      params: z.object({ codigoLinha: z.string().transform(Number) }),
      response: { 200: LineVehiclesPositionsModel },
    },
    handler: spTransController.getVehiclePositionsByLine,
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
    handler: spTransController.getArrivalPrediction,
  });
}
