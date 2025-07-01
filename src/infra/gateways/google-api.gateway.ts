import axios from "axios";
import { GoogleApiGateway } from "../../application/gateways/GoogleApiGateway";
import { LatLang } from "../../@types/latlang.type";
import { GetTransitRouteResponseType, GetTransitRouteType, GetWeatherResponseType } from "../../application/@types/google-gateway.type";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;

export class HttpGoogleApiGateway implements GoogleApiGateway {
  async getTransitRoute(
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
      routeModifiers,
      extraComputations,
      languageCode,
      regionCode,
      units,
      routingPreference,
      requestedReferenceRoutes,
      polylineQuality,
      optimizeWaypointOrder,
      polylineEncoding,
    }
      : GetTransitRouteType
  ): Promise< GetTransitRouteResponseType > {
    const response = await axios.post<GetTransitRouteResponseType>(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        origin,
        destination,
        intermediates: intermediates?.map((intermediate) => ({
          place_id: intermediate.placeId,
          address: intermediate.address,
          vehicle_stop_over: intermediate.vehicleStopOver,
          via: intermediate.via,
          side_of_road: intermediate.sideOfRoad,
          location: { lat_lng: intermediate.location.latLng },
        })),
        travelMode,
        routingPreference,
        polylineQuality,
        polylineEncoding,
        departureTime,
        arrivalTime,
        computeAlternateRoutes,
        routeModifiers,
        languageCode: languageCode || "pt-BR",
        regionCode: regionCode || "BR",
        units,
        optimizeWaypointOrder,
        requestedReferenceRoutes,
        extraComputations,
        trafficModel,
        transitPreferences,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "*",
        },
      }
    );

    return {
      fallbackInfo: response.data.fallbackInfo,
      geocodingResult: response.data.geocodingResult,
      routes: response.data.routes,
    };
  }

  async geocodeAddress(address: string): Promise<any> {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: address.replace(/ /g, "+"),
          language: "pt-BR",
          region: "BR",
          key: GOOGLE_API_KEY,
          components: "country:BR|locality:São+Paulo|",
        },
      }
    );
    return response.data;
  }

  async getWeatherByLatLng({ latitude,longitude }: LatLang): Promise<any> {
    const response = await axios.get<GetWeatherResponseType>(
      `https://weather.googleapis.com/v1/currentConditions:lookup`,
      {
        params: {
          key: GOOGLE_API_KEY,
          "location.latitude": latitude,
          "location.longitude": longitude,
          unitsSystem: "METRIC",
          languageCode: "pt-BR",
        },
      }
    );
    return response.data;
  }

  async getForecastByLatLng({ latitude,longitude }: LatLang): Promise<any> {
    const response = await axios.get(
      `https://weather.googleapis.com/v1/forecast/hours:lookup`,
      {
        params: {
          key: GOOGLE_API_KEY,
          "location.latitude": latitude,
          "location.longitude": longitude,
        },
      }
    );

    return response.data;
  }

  async searchPlace(query: string): Promise<any> {
    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: query,
        languageCode: "pt-BR",
        regionCode: "BR",
        pageSize: 5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.name,places.id,places.types,places.shortFormattedAddress,places.location,places.googleMapsUri,",
        },
      }
    );
    return response.data;
  }
}
