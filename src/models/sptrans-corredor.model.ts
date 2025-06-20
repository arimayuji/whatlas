import { z } from "zod/v4";

export const SpTransCorredorModel = z.object({
  cc: z.number(), // código do corredor
  nc: z.string(), // nome do corredor
});

export const SpTransCorredorResponseModel = z.array(SpTransCorredorModel);

export type SpTransCorredor = z.infer<typeof SpTransCorredorModel>;
