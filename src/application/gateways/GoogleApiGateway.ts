import { LatLang } from "../../@types/latlang.type";
import { GetTransitRouteType } from "../@types/google-gateway.type";

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
    }
      : GetTransitRouteType
  ): Promise<{
    route: any;
    staticMapUrls: string[];
  }>;
  geocodeAddress(address: string): Promise<any>;
  getWeatherByLatLng({ latitude,longitude }: LatLang): Promise<any>;
  getForecastByLatLng({ latitude,longitude }: LatLang): Promise<any>;
  searchPlace(query: string, location?: LatLang): Promise<any>;
}
