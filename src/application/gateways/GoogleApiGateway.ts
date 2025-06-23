import { LatLang } from "../../@types/latlang.type";

export interface GoogleApiGateway {
  getTransitRoute(
    origin: LatLang,
    destination: LatLang,
    travelMode: "TRANSIT" | "WALK" | "BICYCLE"
  ): Promise<{
    route: any;
    staticMapUrls: string[];
  }>;
  geocodeAddress(address: string): Promise<any>;
  getWeatherByLatLng({ lat, lng }: LatLang): Promise<any>;
  getForecastByLatLng({ lat, lng }: LatLang): Promise<any>;
  searchPlace(query: string, location?: LatLang): Promise<any>;
}
