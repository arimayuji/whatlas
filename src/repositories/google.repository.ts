import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;

export const GoogleApiRepository = {
  getTransitRoute: (origin: string, destination: string) =>
    axios.get("https://maps.googleapis.com/maps/api/directions/json", {
      params: {
        origin,
        destination,
        mode: "transit",
        key: GOOGLE_API_KEY,
      },
    }),

  geocodeAddress: (address: string) =>
    axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address,
        key: GOOGLE_API_KEY,
      },
    }),

  getWeatherByLatLng: (lat: number, lng: number) =>
    axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat,
        lon: lng,
        units: "metric",
        appid: GOOGLE_API_KEY,
      },
    }),

  searchPlace: (query: string, location?: { lat: number; lng: number }) =>
    axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
      params: {
        query,
        key: GOOGLE_API_KEY,
        location: location ? `${location.lat},${location.lng}` : undefined,
        radius: location ? 3000 : undefined,
      },
    }),
};
