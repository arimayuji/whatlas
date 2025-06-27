import { z } from "zod/v4";
export const LatLangType = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export type LatLang = z.infer<typeof LatLangType>;
