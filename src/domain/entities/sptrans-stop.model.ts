import { z } from "zod/v4";

export const SpTransStopModel = z.object({
  cp: z.number(), // código da parada
  np: z.string(), // nome da parada
  ed: z.string(), // endereço de localização da parada
  py: z.number(), // latitude
  px: z.number(), // longitude
});

export const SpTransStopResponseModel = z.array(SpTransStopModel);

export type SpTransStop = z.infer<typeof SpTransStopModel>;
