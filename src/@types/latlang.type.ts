import { z } from "zod/v4";
export const LatLangType = z.object({
  lat: z.number(),
  lng: z.number(),
});

export type LatLang = z.infer<typeof LatLangType>;
