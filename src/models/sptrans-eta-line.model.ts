import { z } from "zod/v4";

export const VehicleETAModel = z.object({
  p: z.string(),
  t: z.string(),
  a: z.boolean(),
  ta: z.string(),
  py: z.number(),
  px: z.number(),
});

export const LineETAModel = z.object({
  cp: z.number(),
  np: z.string(),
  py: z.number(),
  px: z.number(),
  vs: z.array(VehicleETAModel),
});

export const VehicleLineETAModel = z.object({
  hr: z.string(),
  ps: z.array(LineETAModel),
});
