import { z } from "zod/v4";

export const SpTransVehicleModel = z.object({
  p: z.number(),
  a: z.boolean(),
  ta: z.string(),
  py: z.number(),
  px: z.number(),
});

export type SpTransVehicle = z.infer<typeof SpTransVehicleModel>;
