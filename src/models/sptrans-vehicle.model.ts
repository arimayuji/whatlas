import { z } from "zod/v4";

export const SpTransVehicleModel = z.object({
  p: z.number(), // prefixo do veículo
  a: z.boolean(), // indica se o veículo possui acessibilidade
  ta: z.string(), // indica o horario em que a localizacao foi capturada
  py: z.number(), // latitude
  px: z.number(), // longitude
});

export type SpTransVehicle = z.infer<typeof SpTransVehicleModel>;

export const LineVehiclesPositionsModel = z.object({
  hr: z.string(),
  vs: z.array(SpTransVehicleModel),
});

export type LineVehiclesPositions = z.infer<typeof LineVehiclesPositionsModel>;
