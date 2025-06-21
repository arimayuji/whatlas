import { z } from "zod/v4";

export const PlacesSearchResponseSchema = z.object({
  results: z.array(
    z.object({
      name: z.string(),
      formatted_address: z.string().optional(),
      geometry: z.object({
        location: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
      }),
      place_id: z.string(),
    })
  ),
  status: z.string(),
});

export type PlacesSearchResponse = z.infer<typeof PlacesSearchResponseSchema>;
