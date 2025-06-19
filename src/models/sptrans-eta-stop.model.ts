import { z } from "zod/v4";
import { VehicleETAModel } from "./sptrans-eta-line.model";

export const LineVehiclesETAModel = z.object({
  c: z.string(),
  cl: z.number(),
  sl: z.number(),
  lt0: z.string(),
  lt1: z.string(),
  qv: z.number(),
  vs: z.array(VehicleETAModel),
});

export const StopETAModel = z.object({
  cp: z.number(),
  np: z.string(),
  py: z.number(),
  px: z.number(),
  l: z.array(LineVehiclesETAModel),
});

export const LinesStopETAModel = z.object({
  hr: z.string(),
  p: StopETAModel,
});
