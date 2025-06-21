import {
  DirectionsResponse,
  DirectionsResponseSchema,
} from "../models/google/google-directions.model";
import {
  GeocodingResponse,
  GeocodingResponseSchema,
} from "../models/google/google-geocode.model";
import {
  WeatherResponse,
  WeatherResponseSchema,
} from "../models/google/google-weather.model";
import {
  PlacesSearchResponse,
  PlacesSearchResponseSchema,
} from "../models/google/google-place.model";
import { GoogleApiRepository } from "../repositories/google.repository";

export const GoogleApiService = {
  getTransitRoute: async (
    origin: string,
    destination: string
  ): Promise<DirectionsResponse> => {
    const res = await GoogleApiRepository.getTransitRoute(origin, destination);
    return DirectionsResponseSchema.parse(res.data);
  },

  geocodeAddress: async (address: string): Promise<GeocodingResponse> => {
    const res = await GoogleApiRepository.geocodeAddress(address);
    return GeocodingResponseSchema.parse(res.data);
  },

  getWeatherByLatLng: async (
    lat: number,
    lng: number
  ): Promise<WeatherResponse> => {
    const res = await GoogleApiRepository.getWeatherByLatLng(lat, lng);
    return WeatherResponseSchema.parse(res.data);
  },

  searchPlace: async (
    query: string,
    location?: { lat: number; lng: number }
  ): Promise<PlacesSearchResponse> => {
    const res = await GoogleApiRepository.searchPlace(query, location);
    return PlacesSearchResponseSchema.parse(res.data);
  },
};
