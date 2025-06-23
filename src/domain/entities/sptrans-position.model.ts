import z from "zod/v4";
import { SpTransVehicleModel } from "./sptrans-vehicle.model";

export const LinePositionModel = z.object({
  c: z.string(), // letreiro completo
  cl: z.number(), // codigo da linha
  sl: z.number(), // sentido de operacao ( 1 - terminal principal -> terminal secundario, 2 - terminal secundario -> terminal principal)
  lt0: z.string(), // letreiro de destino da linha
  lt1: z.string(), // letreiro de origem da linha
  qv: z.number(), // quantidade de veiculos localizados
  vs: z.array(SpTransVehicleModel),
});

export const LinePositionResponseModel = z.object({
  hr: z.string(), // horario de referencia da geracao da resposta
  l: z.array(LinePositionModel),
});

export type LinePosition = z.infer<typeof LinePositionResponseModel>;
