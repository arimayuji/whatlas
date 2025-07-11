import { LatLang } from "../../@types/latlang.type";
import { GetGeocodingResponseType,  GetSearchPlaceResponseType,  GetTransitRouteResponseType, GetTransitRouteType, GetWeatherResponseType } from "../@types/google-gateway.type";

export interface GoogleApiGateway {
  getTransitRoute(
    { 
      destination,
      origin,
      travelMode,
      departureTime,  
      arrivalTime,
      transitPreferences,
      intermediates,
      computeAlternateRoutes,
      optimizeWaypointOrder,
    }
      : GetTransitRouteType
  ): Promise<GetTransitRouteResponseType | null>;
  geocodeAddress(address: string): Promise< GetGeocodingResponseType | null>;
  getWeatherByLatLng({ latitude,longitude }: LatLang): Promise<GetWeatherResponseType | null>;
  getForecastByLatLng({ latitude,longitude }: LatLang): Promise<any>;
  searchPlace(query: string, location?: LatLang): Promise<GetSearchPlaceResponseType | null>;
}
