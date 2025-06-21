import { z } from "zod/v4";

export const LocationModel = z.object({
  label: z.string(),
  lat: z.string(),
  long: z.string(),
});

export type Location = z.infer<typeof LocationModel>;
