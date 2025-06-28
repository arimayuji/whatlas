import { z } from "zod/v4"
import { LatLangType } from "../../@types/latlang.type"

const Waypoint = z.object({
  placeId: z.string(),
  address: z.string(),
  vehicleStopOver: z.boolean(),
  via: z.boolean(),
  sideOfRoad: z.boolean(),
  location: z.object({
    latLng: LatLangType,
  }),
})

export type WaypointType = z.infer<typeof Waypoint>

const getTransitRouteSchema = z.object({
  origin: LatLangType,
  destination: LatLangType,
  travelMode: z.enum(["TRANSIT", "WALK", "BICYCLE"]),
  departureTime: z.string().optional(),
  arrivalTime: z.string().optional(),
  computeAlternativeRoutes: z.boolean(),
  trafficModel: z.enum(["TRAFFIC_AWARE", "BEST_GUESS", "PESSIMISTIC"]).optional(),
  transitPreferences: z.object({
   allowedTravelModes: z.array(z.enum(["BUS", "RAIL", "SUBWAY", "TRAM", "FERRY"])).optional(),
   routingPreference: z.enum(["LESS_WALKING", "FEWER_TRANSFERS"]).optional(),
  }).optional(),
  intermediates: z.array(Waypoint).optional(),
})

export type GetTransitRouteType = z.infer<typeof getTransitRouteSchema>

const LocalizedText = z.object({
  text: z.string(),
  languageCode: z.string(),
})

const TransitRouteReponse = z.object({
  routeLabels: z.array(z.enum(["ROUTE_LABEL_UNKNOWN", "DEFAULT_ROUTE", "DEFAULT_ROUTE_ALTERNATIVE", "FUEL_EFFICIENT", "SHORTER_DISTANCE"])),
  legs: z.any(),
  distanceMeters: z.number(),
  duration: z.string(),
  staticDuration: z.string(),
  polyline: z.any(),
  description: z.string(),
  warnings: z.array(z.string()),
  viewport: z.any(),
  travelAdvisory: z.any(),
  optimizedWaypoints: z.array(z.any()),
  localizedValues: {
    distance: LocalizedText,
    duration: LocalizedText,
    staticDuration: LocalizedText,
    transitFare : LocalizedText
  },
  routeToken: z.string(),
  polylineDetails:{}
})