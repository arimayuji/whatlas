import axios, { AxiosInstance } from "axios";
import { GoogleApiGateway } from "../../application/gateways/GoogleApiGateway";
import { LatLang } from "../../@types/latlang.type";
import { GetGeocodingResponseType, GetGeocodingSchema, GetSearchPlaceResponseSchema, GetSearchPlaceResponseType, getTransitRouteResponseSchema, GetTransitRouteResponseType, GetTransitRouteType, GetWeatherResponseType, GetWeatherSchema } from "../../application/@types/google-gateway.type";

const BASE_URLS = {
  directions: "https://routes.googleapis.com/directions/v2:computeRoutes",
  geocode: "https://maps.googleapis.com/maps/api/geocode/json",
  weatherCurrent: "https://weather.googleapis.com/v1/currentConditions:lookup",
  weatherForecast: "https://weather.googleapis.com/v1/forecast/hours:lookup",
  places: "https://places.googleapis.com/v1/places:searchText",
};

export class HttpGoogleApiGateway implements GoogleApiGateway {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_API_KEY!,
      },
      params: {
        key: process.env.GOOGLE_API_KEY!,
        regionCode: "BR",
        languageCode: "pt-BR",
      },
    });
  }

  async getTransitRoute(
    params: GetTransitRouteType
  ): Promise<GetTransitRouteResponseType | null> {
    const requestBody: Record<string, unknown> = {
      origin: params.origin,
      destination: params.destination,
      travelMode: params.travelMode,
      departureTime: params.departureTime,
      arrivalTime: params.arrivalTime,
      computeAlternativeRoutes: params.computeAlternateRoutes,
      languageCode: "pt-BR",
      regionCode: "BR",
      units: "METRIC",
      optimizeWaypointOrder: params.optimizeWaypointOrder,
      transitPreferences: params.transitPreferences,
      intermediates: params.intermediates?.map(i => ({
        place_id: i.placeId,
        address: i.address,
        vehicle_stop_over: i.vehicleStopOver,
        via: i.via,
        side_of_road: i.sideOfRoad,
        location: { lat_lng: i.location.latLng },
      })),
    };

    const instance = axios.create({
      params: {
        key: process.env.GOOGLE_API_KEY!,
      },
    })
    
    try {
      const { data } = await instance.post<GetTransitRouteResponseType>(
        `${BASE_URLS.directions}`,
        requestBody,
        {
          headers: {
            "X-Goog-FieldMask":"routes",
          }
        }
      );
      
      console.log("data", data)
      const parsed = getTransitRouteResponseSchema.safeParse(data);
  
      if (!parsed.success) {
        console.log(parsed.error)
        return null;
      }
  
      return {
        fallbackInfo: parsed.data.fallbackInfo,
        geocodingResult: parsed.data.geocodingResult,
        routes: parsed.data.routes,
      };
    }
    catch (error) {
      return null;
    }
  }

  async geocodeAddress(address: string): Promise<GetGeocodingResponseType | null> {
    const { data } = await this.client.get<GetGeocodingResponseType>(
      BASE_URLS.geocode,
      {
        params: {
          address: address.replace(/\s+/g, "+"),
          components: "country:BR|locality:São+Paulo|",
        },
      }
    );

    const parsed = GetGeocodingSchema.safeParse(data);

    if (!parsed.success) {
      return null;
    }

    return parsed.data;
  }

  async getWeatherByLatLng({ latitude, longitude }: LatLang): Promise<GetWeatherResponseType | null> {
    const instance = axios.create({
      params: {
        key: process.env.GOOGLE_API_KEY!,
        languageCode: "pt-BR",
        unitsSystem: "METRIC",
      },
    })


    const { data } = await instance.get<GetWeatherResponseType>(
      BASE_URLS.weatherCurrent,
      {
        params: {
          "location.latitude": latitude,
          "location.longitude": longitude,
        },
      }
    );

    const parsed = GetWeatherSchema.safeParse(data);

    if (!parsed.success) {
      console.log(parsed.error)
      return null;
    }

    return parsed.data;
  }

  async getForecastByLatLng({ latitude, longitude }: LatLang): Promise<any> {
    const { data } = await this.client.get(
      BASE_URLS.weatherForecast,
      {
        params: {
          "location.latitude": latitude,
          "location.longitude": longitude,
        },
      }
    );
    return data;
  }

  async searchPlace(query: string): Promise<GetSearchPlaceResponseType | null> {
    const { data } = await this.client.post<unknown>(
      BASE_URLS.places,
      { textQuery: query, pageSize: 5 },
      {
        headers: {
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.name,places.id,places.types,places.shortFormattedAddress,places.location,places.googleMapsUri",
        },
      }
    );
    const parsed = GetSearchPlaceResponseSchema.safeParse(data);
    if (!parsed.success) {
      return null;
    }
    return parsed.data;
  }
}
