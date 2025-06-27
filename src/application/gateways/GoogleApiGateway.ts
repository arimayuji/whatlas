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
  getWeatherByLatLng({ latitude,longitude }: LatLang): Promise<any>;
  getForecastByLatLng({ latitude,longitude }: LatLang): Promise<any>;
  searchPlace(query: string, location?: LatLang): Promise<any>;
}
