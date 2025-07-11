import { z } from "zod/v4"
import { LatLangType } from "../../@types/latlang.type"

const Waypoint = z.object({
  placeId: z.string().optional(),
  address: z.string().optional(),
  vehicleStopOver: z.boolean().optional(),
  via: z.boolean().optional(),
  sideOfRoad: z.boolean().optional(),
  location: z.object({
    latLng: LatLangType,
    heading: z.number().optional(),
  }),
})

const NavigationInstruction = z.object({
  maneuver: z.enum(["MANUEVER_UNSPECIFIED", "TURN_SLIGHT_LEFT","TURN_SHARP_LEFT","UTURN_LEFT","TURN_LEFT","TURN_SLIGHT_RIGHT", "TURN_SHARP_RIGHT", "UTURN_RIGHT","TURN_RIGHT", "STRAIGHT","RAMP_LEFT","RAMP_RIGHT", "MERGE", "FORK_LEFT", "FORK_RIGHT","FERRY","FERRY_TRAIN","ROUNDABOUT_LEFT","ROUNDABOUT_RIGHT","DEPART", "NAME_CHANGE"]),
  instructions: z.string().optional(),
})

const RouteLegStepTravelAdvisory = z.object({
  speedReadingIntervals: z.array(
    z.object({
      startPolylineIndex: z.number(),
      endPolylineIndex: z.number(),
      speed:z.enum(["SPEED_UNSPECIFIED", "NORMAL", "SLOW", "TRAFFIC_JAM"])
    })
  )
})

const Location = z.object({
  latLng: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  heading: z.number().optional()
})

const Polyline = z.object({
  encodedPolyline: z.string().optional(),
  geoJsonLineString: z.any().optional(),
})

export type WaypointType = z.infer<typeof Waypoint>

const VehicleInfo = z.object({
  emissionType: z.enum(["VEHICLE_EMISSION_TYPE_UNSPECIFIED", "GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"]),
})

const RouteModifiers = z.object({
  avoidTolls: z.boolean().optional(),
  avoidHighways: z.boolean().optional(),
  avoidFerries: z.boolean().optional(),
  avoidIndoor: z.boolean().optional(),
  vehicleInfo: VehicleInfo,
  tollPasses: z.any()
})

const LocalizedText = z.object({
  text: z.string().optional(),
  languageCode: z.string().optional(),
})

const LocalizedTime = z.object({
  time: LocalizedText,
  timeZone: z.string(),
})

const RouteLegStepLocalizedValues = z.object({
  distance: LocalizedText,
  staticDuration:LocalizedText
})

const TransitStop = z.object({
  name: z.string(),
  location: Location
})

const TransitStopDetails = z.object({
  arrivalStop: TransitStop.optional(),
  arrivalTime: z.string().optional(),
  departureStop: TransitStop.optional(),
  departureTime: z.string().optional(),
})

const TransitDetailsLocalizedValues = z.object({
  arrivalTime: LocalizedTime,
  departureTime: LocalizedTime
})

const TransitAgency = z.object({
  name: z.string(),
  phoneNumber: z.string().optional(),
  uri: z.string().optional(),
})

export const TransitVehicleTypeEnum = z.enum([
  "TRANSIT_VEHICLE_TYPE_UNSPECIFIED",
  "BUS",
  "CABLE_CAR",
  "COMMUTER_TRAIN",
  "FERRY",
  "FUNICULAR",
  "GONDOLA_LIFT",
  "HEAVY_RAIL",
  "HIGH_SPEED_TRAIN",
  "INTERCITY_BUS",
  "LONG_DISTANCE_TRAIN",
  "METRO_RAIL",
  "MONORAIL",
  "OTHER",
  "RAIL",
  "SHARE_TAXI",
  "SUBWAY",
  "TRAM",
  "TROLLEYBUS",
]);

const TransitVehicle = z.object({
  name: LocalizedText,
  type: TransitVehicleTypeEnum.optional(),
  iconUri: z.string().optional(),
  localIconUri: z.string().optional()
})

const TransitLine = z.object({
  agencies: z.array(
    TransitAgency
  ).optional(),
  name: z.string().optional(),
  uri: z.string().optional(),
  color: z.string().optional(),
  iconUri: z.string().optional(),
  nameShort: z.string().optional(),
  textColor: z.string().optional(),
  vehicle: TransitVehicle,
})

const RouteLegStepTransitDetails = z.object({
  stopDeatils: TransitStopDetails.optional(),
  localizedValues: TransitDetailsLocalizedValues.optional(),
  headsign: z.string().optional(),
  headwayName: z.string().optional(),
  transitLine: TransitLine.optional(),
  stopCount: z.number().optional(),
  tripShortText: z.string().optional(),
})

const MultiModalSegment = z.object({
  navigationInstructions: NavigationInstruction.optional(),
  travelMode: z.enum(["TRANSIT", "WALK", "BICYCLE"]),
  stepStartIndex: z.number().optional(),
  stepEndIndex: z.number().optional(),
})

const StepsOverview = z.object({
  multiModalSegments: z.array(MultiModalSegment).optional(),
})

const RouteLegStep = z.object({
  distanceMeters: z.number(),
  staticDuration: z.string(),
  polyline: Polyline.optional(),
  startLocation: Location.optional(),
  endLocation: Location.optional(),
  navigationInstructions: NavigationInstruction.optional(),
  travelAdvisory: RouteLegStepTravelAdvisory.optional(),
  localizedValues: RouteLegStepLocalizedValues.optional(),
  transitDetails: RouteLegStepTransitDetails.optional(),
  travelMode: z.enum(["TRANSIT", "WALK", "BICYCLE"]),
})

const Money = z.object({
  currencyCode: z.string(),
  units: z.string(),
  nanos:z.number()
})

const TollInfo = z.object({
  estimatedPrice: z.array(
    Money
  )
})

const SpeedReadingInterval = z.object({
  startPolylinePointIndex: z.number(),
  endPolylinePointIndex: z.number(),
  speed: z.enum(["SPEED_UNSPECIFIED", "NORMAL", "SLOW", "TRAFFIC_JAM"])
})

const RouteTravelAdvisory = z.object({
  tollInfo: TollInfo,
  speedReadingIntervals: z.array(
    SpeedReadingInterval
  )
})

const Status = z.object({
  code: z.number(),
  message: z.string(),
  details: z.array(z.any())
})

const GeocodedWaypoint = z.object({
  geocoderStatus: Status,
  type: z.array(z.string()),
  partialMatch: z.boolean(),
  placeId: z.string(),
  intermediateWaypointRequestIndex: z.number()
})

const GeocodingResults = z.object({
  origin: GeocodedWaypoint,
  destination: GeocodedWaypoint,
  intermediates: z.array(GeocodedWaypoint),
})

const RouteLeg = z.object({
  distanceMeters: z.number().optional(),
  duration: z.string().optional(),
  staticDuration: z.string().optional(),
  polyline: Polyline.optional(),
  startLocation: Location.optional(),
  endLocation: Location.optional(),
  steps: z.array(RouteLegStep).optional().default([]),
  travelAdvisory: RouteTravelAdvisory.optional(),
  localizedValues: RouteLegStepLocalizedValues.optional(),
  stepsOverview: StepsOverview.optional()
})

const ViewPort = z.object({
  low: LatLangType,
  high: LatLangType,
})

const PolylinePointIndex = z.object({
  startIndex: z.number(),
  endIndex: z.number(),
})
   
const FlyoverInfo = z.object({
  flyoverPresence: z.enum(["FLYOVER_PRESENCE_UNSPECIFIED", "FLYOVER_PRESENT", "FLYOVER_NOT_PRESENT"]),
  polylinePointIndex: PolylinePointIndex
})

const NarrowRoadInfo = z.object({
  narrowRoadPresence: z.enum(["NARROW_ROAD_PRESENCE_UNSPECIFIED", "EXISTS", "DOES_NOT_EXIST"]),
  polylinePointIndex: PolylinePointIndex
})

const PolylineDetails = z.object({
  flyoverInfo: z.array(FlyoverInfo),
  narrowRoadInfo: z.array(NarrowRoadInfo),
})

const FallbackInfo = z.object({
  routingMode: z.enum(["FALLBACK_ROUTING_MODE_UNSPECIFIED","FALLBACK_TRAFFIC_UNAWARE", "FALLBACK_TRAFFIC_AWARE"]),
  reason: z.enum(["FALLBACK_REASON_UNSPECIFIED","SERVER_ERROR","LATENCY_EXCEEDED"]),
})

const Route = z.object({
  // routeLabels: z.array(z.enum(["ROUTE_LABEL_UNKNOWN", "DEFAULT_ROUTE", "DEFAULT_ROUTE_ALTERNATIVE", "FUEL_EFFICIENT", "SHORTER_DISTANCE"])),
  legs: z.array(RouteLeg).optional().default([]),
  distanceMeters: z.number(),
  duration: z.string(),
  staticDuration: z.string(),
  polyline: Polyline,
  description: z.string().optional(),
  warnings: z.array(z.string()).optional().default([]),
  // viewport: ViewPort,
  // travelAdvisory: RouteTravelAdvisory,
  optimizedIntermediateWaypointIndex: z.array(z.number()).optional().default([]),
  localizedValues: z.object({
    distance: LocalizedText.optional(),
    duration: LocalizedText.optional(),
    staticDuration: LocalizedText.optional(),
    transitFare : LocalizedText.optional()
  }).optional(),
  // routeToken: z.string(),
  polylineDetails: PolylineDetails.optional()
})

export const getTransitRouteSchema = z.object({
  origin: Waypoint,
  destination: Waypoint,
  intermediates: z.array(Waypoint).optional().default([]),
  travelMode: z.enum(["TRANSIT", "WALK", "BICYCLE"]),
  // routingPreference: z.enum(["ROUTING_PREFERENCE_UNSPECIFIED", "TRAFFIC_UNAWARE", "TRAFFIC_AWARE", "TRAFFIC_AWARE_OPTIMAL"]).optional(),
  // polylineQuality: z.enum(["POLYLINE_QUALITY_UNSPECIFIED", "HIGH_QUALITY", "OVERVIEW"]).optional(),
  // polylineEncoding: z.enum(["POLYLINE_ENCODING_UNSPECIFIED", "ENCODED_POLYLINE", "GEO_JSON_LINESTRING"]).optional(),
  departureTime: z.string().optional().default(new Date().toISOString()),
  arrivalTime: z.string().optional(),
  computeAlternateRoutes: z.boolean().optional().default(true),
  // routeModifiers: RouteModifiers,
  // languageCode: z.string().optional().default("pt-BR"),
  // regionCode: z.string().optional().default("BR"),
  // units: z.enum(["UNITS_UNSPECIFIED", "METRIC", "IMPERIAL"]).optional(),
  optimizeWaypointOrder: z.boolean().optional(),
  // requestedReferenceRoutes: z.array(z.enum(["REQUESTED_REFERENCE_ROUTE_UNSPECIFIED", "FUEL_EFFICIENT", "SHORTER_DISTANCE"])).optional(),
  // extraComputations: z.array(z.enum(["EXTRA_COMPUTATION_UNSPECIFIED", "TOLLS", "FERRIES", "FUEL_CONSUMPTION","TRAFFIC_ON_POLYLINE","HTML_FORMATTED_NAVIGATION_INSTRUCTIONS","FLYOVER_INFO_ON_POLYLINE","NARROW_ROAD_INFO_ON_POLYLINE"])).optional(),
  // trafficModel: z.enum(["TRAFFIC_AWARE", "BEST_GUESS", "PESSIMISTIC","OPTIMISTIC"]).optional(),
  transitPreferences: z.object({
   allowedTravelModes: z.array(z.enum(["BUS", "RAIL", "SUBWAY", "TRAIN", "LIGHT_RAIL"])).optional(),
   routingPreference: z.enum(["LESS_WALKING", "FEWER_TRANSFERS"]).optional(),
  }).optional(),
})

export const getTransitRouteResponseSchema = z.object({
  routes: z.array(Route),
  fallbackInfo: FallbackInfo.optional(),
  geocodingResult: GeocodingResults.optional()
})

export type GetTransitRouteResponseType = z.infer<typeof getTransitRouteResponseSchema>
export type GetTransitRouteType = z.infer<typeof getTransitRouteSchema>


const TimeZone = z.object({
  id: z.string(),
})

export const WeatherCondition = z.object({
  iconBaseUri: z.string(),
  description: LocalizedText,
  type: z.string()
})

export const Temperature = z.object({
  unit: z.enum(["UNIT_UNSPECIFIED", "CELSIUS", "FAHRENHEIT"]),
  degrees: z.number(),
})

const PrecipitationProbability = z.object({

})

export const Precipitation = z.object({
  probability: z.object({
    percent: z.number(),
    type:z.enum([
      "PRECIPITATION_TYPE_UNSPECIFIED",
      "NONE",
      "SNOW",
      "RAIN",
      "LIGHT_RAIN",
      "HEAVY_RAIN",
      "RAIN_AND_SNOW",
      "SLEET",
      "FREEZING_RAIN",
      ])
  }),
  qpf: z.object({
    quantity: z.number(),
    unit: z.string(),
  })
})

const AirPressure = z.object({
  meanSeaLevelMillibars: z.number(),
})

const WindDirection = z.object({
  cardinal: z.enum([
    "CARDINAL_DIRECTION_UNSPECIFIED",
    "NORTH",
    "NORTH_NORTHEAST",
    "NORTHEAST",
    "EAST_NORTHEAST",
    "EAST",
    "EAST_SOUTHEAST",
    "SOUTHEAST",
    "SOUTH_SOUTHEAST",
    "SOUTH",
    "SOUTH_SOUTHWEST",
    "SOUTHWEST",
    "WEST_SOUTHWEST",
    "WEST",
    "WEST_NORTHWEST",
    "NORTHWEST",
    "NORTH_NORTHWEST",
  ]),
  degrees: z.number(),
})

const WindSpeed = z.object({
  unit: z.enum(["UNIT_UNSPECIFIED", "KILOMETERS_PER_HOUR", "MILES_PER_HOUR"]),
  value: z.number(),
})

const Wind = z.object({
  direction: WindDirection,
  speed: WindSpeed,
  gust: WindSpeed
})

const Visibility = z.object({
  unit: z.enum(["UNIT_UNSPECIFIED", "KILOMETERS", "MILES"]),
  distance: z.number(),
})

const QuantitativePrecipitationForecast = z.object({
  unit: z.enum(["UNIT_UNSPECIFIED", "MILLIMETERS", "INCHES"]),
  quantity: z.number(),
})

const CurrentConditionHistory = z.object({
  temperatureChange: Temperature,
  maxTemperature: Temperature,
  minTemperature: Temperature,
  qpf: QuantitativePrecipitationForecast,
})

export const GetWeatherSchema = z.object({
  currentTime: z.string(),
  timeZone: TimeZone,
  isDaytime:z.boolean(),
  weatherCondition: WeatherCondition,
  temperature: Temperature,
  feelsLikeTemperature: Temperature,
  dewPoint: Temperature,
  heatIndex: Temperature,
  windChill: Temperature,
  relativeHumidity: z.number(),
  uvIndex: z.number(),
  precipitation: Precipitation,
  thunderstormProbability: z.number(),
  airPressure: AirPressure,
  wind: Wind,
  visibility: Visibility,
  cloudCover: z.number(),
  currentConditionsHistory:CurrentConditionHistory,
})

export type GetWeatherResponseType = z.infer<typeof GetWeatherSchema>

const AddressTypes = z.enum([
  "street_address",
  "route",
  "intersection",
  "political",
  "country",
  "administrative_area_level_1",
  "administrative_area_level_2",
  "administrative_area_level_3",
  "administrative_area_level_4",
  "administrative_area_level_5",
  "administrative_area_level_6",
  "administrative_area_level_7",
  "colloquial_area",
  "locality",
  "sublocality",
  "neighborhood",
  "premise",
  "subpremise",
  "plus_code",
  "postal_code",
  "natural_feature",
  "airport",
  "park",
  "point_of_interest",
  "floor",
  "establishment",
  "landmark",
  "parking",
  "post_box",
  "postal_town",
  "room",
  "street_number",
  "bus_station",
  "train_station",
  "transit_station",
]);

const ResultsTypes = z.enum(["OK", "ZERO_RESULTS", "OVER_DAILY_LIMIT", "OVER_QUERY_LIMIT","REQUEST_DENIED", "INVALID_REQUEST", "UNKNOWN_ERROR"])

export const GetGeocodingSchema = z.object({
  results: z.array(
    z.object({
      address_components: z.array(
        z.object({
          long_name: z.string(),
          short_name: z.string(),
          types: z.array(z.string()),
        })
      ),
      formatted_address: z.string(),
      geometry: z.object({
        bounds: z.object({
          northeast: z.object({
            lat: z.number(),
            lng: z.number()
          }),
          southwest: z.object({
            lat: z.number(),
            lng: z.number() 
          }),
        }),
        location:z.object({
          lat: z.number(),
          lng: z.number()
        }),
        location_type: z.enum(["APPROXIMATE", "GEOMETRIC_CENTER", "ROOFTOP", "RANGE_INTERPOLATED"]),
        viewport : z.object({
          northeast: z.object({
            lat: z.number(),
            lng: z.number()
          }),
          southwest: z.object({
            lat: z.number(),
            lng: z.number() 
          }),
        }),
      }),
      partial_match:z.boolean().optional(),
      place_id: z.string(),
      types: z.array(AddressTypes),
    })
  ),
  status :ResultsTypes,
})

export type GetGeocodingResponseType = z.infer<typeof GetGeocodingSchema>

export const GetSearchTextResponseSchema = z.object({
  textQuery: z.string(),
  languageCode: z.string(),
  regionCode: z.string(),
  rankPreference: z.enum(["RANK_PREFERENCE_UNSPECIFIED", "DISTANCE", "RELEVANCE"]),
})

export const GetSearchPlaceResponseSchema = z.object({
  name: z.string(),
  id: z.string(),
  displayName: LocalizedText,
  types: z.array(z.string()),
  formattedAddress: z.string(),
  shortFormattedAddress: z.string(),
  location: LatLangType,
  googleMapsUri: z.string(),
})

export type GetSearchPlaceResponseType = z.infer<typeof GetSearchPlaceResponseSchema>