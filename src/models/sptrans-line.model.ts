import { z } from "zod/v4";

export const SpTransLineModel = z.object({
  cl: z.number(),
  lc: z.boolean(),
  lt: z.string(),
  sl: z.number().int(),
  tl: z.number().int(),
  tp: z.string(),
  ts: z.string(),
});

export const SpTransLineResponseModel = z.array(SpTransLineModel);

export type SpTransLine = z.infer<typeof SpTransLineModel>;
