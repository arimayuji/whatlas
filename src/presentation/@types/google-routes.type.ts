import { z } from "zod/v4";

export const directionsQuerySchema = z.object({
  origin_lat: z.string(),
  origin_lng: z.string(),
  destination_lat: z.string(),
  destination_lng: z.string(),
  travelMode: z.enum(["TRANSIT", "WALK", "BICYCLE"]),
});

export const geocodeQuerySchema = z.object({
  address: z.string(),
});

export const weatherQuerySchema = z.object({
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

export const placeSearchQuerySchema = z.object({
  query: z.string(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
});

export type DirectionsQuery = z.infer<typeof directionsQuerySchema>;
export type GeocodeQuery = z.infer<typeof geocodeQuerySchema>;
export type WeatherQuery = z.infer<typeof weatherQuerySchema>;
export type PlaceSearchQuery = z.infer<typeof placeSearchQuerySchema>;
