import axios from "axios";
import { GoogleApiGateway } from "../../application/gateways/GoogleApiGateway";
import { LatLang } from "../../@types/latlang.type";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;

export class HttpGoogleApiGateway implements GoogleApiGateway {
  async getTransitRoute(
    origin: LatLang,
    destination: LatLang,
    travelMode: "TRANSIT" | "WALK" | "BICYCLE"
  ): Promise<{
    route: any;
    staticMapUrls: string[];
  }> {
    const response = await axios.post(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        origin: { location: { latLng: origin } },
        destination: { location: { latLng: destination } },
        travelMode,
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: true,
        languageCode: "pt-BR",
        units: "METRIC",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.legs.steps,routes.legs.duration,routes.legs.distanceMeters,routes.polyline.encodedPolyline",
        },
      }
    );

    const staticMapUrls = response.data.routes
      .map((route: any) => {
        const polyline = route.polyline?.encodedPolyline;
        return polyline
          ? `https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:red|${origin.lat},${origin.lng}&markers=color:blue|${destination.lat},${destination.lng}&path=enc:${polyline}&key=${process.env.GOOGLE_API_KEY}`
          : null;
      })
      .filter((url: string | null) => url);

    return {
      route: response.data,
      staticMapUrls,
    };
  }

  async geocodeAddress(address: string): Promise<any> {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address,
          key: GOOGLE_API_KEY,
        },
      }
    );
    return response.data;
  }

  async getWeatherByLatLng({ lat, lng }: LatLang): Promise<any> {
    const response = await axios.get(
      `https://weather.googleapis.com/v1/currentConditions:lookup`,
      {
        params: {
          key: GOOGLE_API_KEY,
          "location.latitude": lat,
          "location.longitude": lng,
        },
      }
    );
    return response.data;
  }

  async getForecastByLatLng({ lat, lng }: LatLang): Promise<any> {
    const response = await axios.get(
      `https://weather.googleapis.com/v1/forecast/hours:lookup`,
      {
        params: {
          key: GOOGLE_API_KEY,
          "location.latitude": lat,
          "location.longitude": lng,
        },
      }
    );

    return response.data;
  }

  async searchPlace(query: string, location?: LatLang): Promise<any> {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          query,
          key: GOOGLE_API_KEY,
          location: location ? `${location.lat},${location.lng}` : undefined,
          radius: location ? 3000 : undefined,
        },
      }
    );
    return response.data;
  }
}
