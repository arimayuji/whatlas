import { z } from "zod/v4";

export const LocationModel = z.object({
  label: z.string(),
  latitude: z.string(),
  longitude: z.string(),
});

export type Location = z.infer<typeof LocationModel>;
