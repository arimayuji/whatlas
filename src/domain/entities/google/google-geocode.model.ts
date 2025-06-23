import { z } from "zod/v4";

export const GeocodingResponseSchema = z.object({
  results: z.array(
    z.object({
      formatted_address: z.string(),
      geometry: z.object({
        location: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
      }),
    })
  ),
  status: z.string(),
});

export type GeocodingResponse = z.infer<typeof GeocodingResponseSchema>;
