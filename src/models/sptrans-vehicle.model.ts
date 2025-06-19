import { z } from "zod/v4";

export const SpTransVehicleModel = z.object({
  p: z.number(),
  a: z.boolean(),
  ta: z.string(),
  py: z.number(),
  px: z.number(),
});

export type SpTransVehicle = z.infer<typeof SpTransVehicleModel>;

export const LineVehiclesPositionsModel = z.object({
  hr: z.string(),
  vs: z.array(SpTransVehicleModel),
});
