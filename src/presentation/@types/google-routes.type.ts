import { z } from "zod/v4";

export const routesPostSchema = z.object({
  origin_lat: z.string(),
  origin_lng: z.string(),
  destination_lat: z.string(),
  destination_lng: z.string(),
  computeAlternativeRoutes: z.boolean(),
  arrival_time: z.string().optional(),
  departure_time: z.string().optional(),
  travelMode: z.enum(["TRANSIT", "WALK", "BICYCLE"]),
  intermediates: z.array(
    z.object({
      placeId: z.string(),
      address: z.string(),
      vehicleStopOver: z.boolean().optional(),
      via: z.boolean().optional(),
      sideOfRoad: z.boolean().optional(),
      location: z.object({
        latLng: z.object({
          latitude: z.number(),
          longitude: z.number(),
        }),
      }),
    })
  ),
})

export const geocodeQuerySchema = z.object({
  address: z.string(),
});

export const weatherQuerySchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export const placeSearchQuerySchema = z.object({
  query: z.string(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
});

export type RoutesPostData = z.infer<typeof routesPostSchema>;
export type GeocodeQuery = z.infer<typeof geocodeQuerySchema>;
export type WeatherQuery = z.infer<typeof weatherQuerySchema>;
export type PlaceSearchQuery = z.infer<typeof placeSearchQuerySchema>;
