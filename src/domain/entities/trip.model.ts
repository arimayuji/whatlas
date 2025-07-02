import { z } from "zod/v4";
import { LocationSchema } from "./user.model";
import { Precipitation, Temperature, WeatherCondition } from "../../application/@types/google-gateway.type";
import { ZOD_ERRORS_MESSAGES } from "../../utils/error-messages";

const TRIP_TYPE = z.enum(["TRIP", "RETURN"])
const TRIP_STATUS = z.enum(["PENDING", "COMPLETED", "CANCELED"])
export const TRIP_VEHICLE = z.enum(["SUBWAY", "BUS"])

export const VEHICLE_TICKETS_PRICES = {
  [TRIP_VEHICLE.enum.BUS]: 5.20,
  [TRIP_VEHICLE.enum.SUBWAY]: 5.00,
}

export const TripStepModel = z.object({
  id: z.string(),
  isHalfFare: z.boolean().default(false),
  location: LocationSchema,
  price: z.number(),
  label: z.string(),
  type: TRIP_TYPE,
  vehicle: TRIP_VEHICLE,
}).transform(tripStep => {
  return {
    ...tripStep,
    price: tripStep.isHalfFare ? VEHICLE_TICKETS_PRICES[tripStep.vehicle] / 2 : VEHICLE_TICKETS_PRICES[tripStep.vehicle]
  }
})

export type TripStep = z.infer<typeof TripStepModel>

export const TripModel = z.object({
  id: z.string(),
  steps: z.array(TripStepModel),
  status: TRIP_STATUS,
  totalAmount: z.number().nonnegative().default(0),
  isFavorite: z.boolean().default(false),
  duration: z.number().nonnegative({error: ZOD_ERRORS_MESSAGES["number.nonnegative"]}),
  weatherCondition: z.object({
    weatherCondition: WeatherCondition,
    temperature: Temperature,
    feelsLikeTemperature: Temperature,
    precipitation:Precipitation
  }),
  origin: LocationSchema,
  destination: LocationSchema,
  arrivalAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}).transform(trip => {
  return {
    ...trip,
    totalAmount: trip.steps.reduce((acc, step) => acc + step.price, 0)
  }
})

export type Trip = z.infer<typeof TripModel>