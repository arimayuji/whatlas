import { FastifyTypedInstance } from "../../@types/fastify.types";
import { z } from "zod/v4";
import { SptransCompanyResponseModel } from "../../domain/entities/sptrans-company.model";
import { SpTransCorredorResponseModel } from "../../domain/entities/sptrans-corredor.model";
import { LineStopETAModel } from "../../domain/entities/sptrans-eta-stopline.model";
import { SpTransLinesModel } from "../../domain/entities/sptrans-line.model";
import { LinePositionResponseModel } from "../../domain/entities/sptrans-position.model";
import { SpTransStopResponseModel } from "../../domain/entities/sptrans-stop.model";
import { LineVehiclesPositionsModel } from "../../domain/entities/sptrans-vehicle.model";
import { SpTransGateway } from "../../application/gateways/SpTransGateway";
import { SpTransController } from "../controllers/sptrans.controller";

export async function sptransRoutes(
  app: FastifyTypedInstance,
  controller: SpTransController
) {
  app.get("/sptrans/companies", {
    schema: {
      tags: ["sptrans"],
      description: "List all SPTrans companies",
      response: { 200: SptransCompanyResponseModel },
    },
    handler: controller.getCompanies,
  });

  app.get("/sptrans/corredores", {
    schema: {
      tags: ["sptrans"],
      description: "List all SPTrans corridors",
      response: { 200: SpTransCorredorResponseModel },
    },
    handler: controller.getCorredores,
  });

  app.get("/sptrans/lines/search", {
    schema: {
      tags: ["sptrans"],
      description: "Search lines by term",
      querystring: z.object({ termosBusca: z.string() }),
      response: { 200: SpTransLinesModel },
    },
    handler: controller.searchLines,
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
    handler: controller.searchLineWithDirection,
  });

  app.get("/sptrans/stops/search", {
    schema: {
      tags: ["sptrans"],
      description: "Search stops by term",
      querystring: z.object({ termosBusca: z.string() }),
      response: { 200: SpTransStopResponseModel },
    },
    handler: controller.getStopsByTerm,
  });

  app.get("/sptrans/stops/line/:codigoLinha", {
    schema: {
      tags: ["sptrans"],
      description: "Get stops by line code",
      params: z.object({ codigoLinha: z.string().transform(Number) }),
      response: { 200: SpTransStopResponseModel },
    },
    handler: controller.getStopsByLine,
  });

  app.get("/sptrans/vehicles/positions", {
    schema: {
      tags: ["sptrans"],
      description: "Get all vehicle positions",
      response: { 200: LinePositionResponseModel },
    },
    handler: controller.getVehiclePositions,
  });

  app.get("/sptrans/vehicles/line/:codigoLinha", {
    schema: {
      tags: ["sptrans"],
      description: "Get vehicle positions by line",
      params: z.object({ codigoLinha: z.string().transform(Number) }),
      response: { 200: LineVehiclesPositionsModel },
    },
    handler: controller.getVehiclePositionsByLine,
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
    handler: controller.getArrivalPrediction,
  });
}
