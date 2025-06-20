import { z } from "zod/v4";
import { VehicleETAModel } from "./sptrans-eta-line.model";

export const LineVehiclesETAModel = z.object({
  c: z.string(), // letreiro completo
  cl: z.number(), // código da linha
  sl: z.number(), // sentido de operação ( 1 - terminal principal -> terminal secundário, 2 - terminal secundário -> terminal principal)
  lt0: z.string(), // letreiro de destino da linha
  lt1: z.string(), // letreiro de origem da linha
  qv: z.number(), // quantidade de veículos localizados
  vs: z.array(VehicleETAModel),
});

export const StopETAModel = z.object({
  cp: z.number(), // código da parada
  np: z.string(), // nome da parada
  py: z.number(), // latitude
  px: z.number(), // longitude
  l: z.array(LineVehiclesETAModel),
});

export const LinesStopETAModel = z.object({
  hr: z.string(), // horário de referência da geração da resposta
  p: StopETAModel,
});

export type LineStopETA = z.infer<typeof LinesStopETAModel>;
