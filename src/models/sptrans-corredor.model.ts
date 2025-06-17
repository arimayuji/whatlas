import { z } from "zod/v4";

export const SpTransCorredorModel = z.object({
  cc: z.number(),
  nc: z.string(),
});

export type SpTransCorredor = z.infer<typeof SpTransCorredorModel>;
