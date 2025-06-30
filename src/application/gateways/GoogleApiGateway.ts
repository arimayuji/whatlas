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
      trafficModel,
      transitPreferences,
      intermediates,
      computeAlternateRoutes,
      routingPreference,
      polylineQuality,
      polylineEncoding,
      routeModifiers,
      extraComputations,
      languageCode,
      regionCode,
      units,
      optimizeWaypointOrder,
      requestedReferenceRoutes,
    }
      : GetTransitRouteType
  ): Promise<GetTransitRouteResponseType>;
  geocodeAddress(address: string): Promise< GetGeocodingResponseType>;
  getWeatherByLatLng({ latitude,longitude }: LatLang): Promise<GetWeatherResponseType>;
  getForecastByLatLng({ latitude,longitude }: LatLang): Promise<any>;
  searchPlace(query: string, location?: LatLang): Promise<GetSearchPlaceResponseType>;
}
