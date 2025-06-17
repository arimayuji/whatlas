import { z } from "zod/v4";

export const SpTransStopModel = z.object({
  cp: z.number(),
  np: z.string(),
  ed: z.string(),
  py: z.number(),
  px: z.number(),
});

export type SpTransStop = z.infer<typeof SpTransStopModel>;
