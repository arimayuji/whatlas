import { z } from "zod/v4";
import { LocationSchema } from "./user.model";
import { Precipitation, Temperature, WeatherCondition } from "../../application/@types/google-gateway.type";

const TRIP_TYPE = z.enum(["TRIP", "RETURN"])
const TRIP_STATUS = z.enum(["PENDING", "COMPLETED", "CANCELED"])
const TRIP_VEHICLE = z.enum(["SUBWAY", "BUS"])

const VEHICLE_TICKETS_PRICES = {
  [TRIP_VEHICLE.enum.BUS]: 5.20,
  [TRIP_VEHICLE.enum.SUBWAY]: 5.00,
}

export const TripStepModel = z.object({
  id: z.string(),
  isHalfFare: z.boolean().default(false),
  location: LocationSchema,
  price: z.number(),
  type: TRIP_TYPE,
  vehicle: TRIP_VEHICLE,
}).transform(tripStep => {
  return {
    ...tripStep,
    price: tripStep.isHalfFare ? VEHICLE_TICKETS_PRICES[tripStep.vehicle] / 2 : VEHICLE_TICKETS_PRICES[tripStep.vehicle]
  }
})

export const TripModel = z.object({
  id: z.string(),
  steps: z.array(TripStepModel),
  status: TRIP_STATUS,
  totalAmount: z.number(),
  isFavorite: z.boolean().default(false),
  duration: z.number(),
  weatherCondition: z.object({
    weatherCondition: WeatherCondition,
    temperature: Temperature,
    feelsLikeTemperature: Temperature,
    precipitation:Precipitation
  }),
  origin: LocationSchema,
  destination: LocationSchema,
  createdAt: z.string(),
}).transform(trip => {
  return {
    ...trip,
    totalAmount: trip.steps.reduce((acc, step) => acc + step.price, 0)
  }
})

export const UserCardBalanceModel = z.object({
  userId: z.string(),
  currentBalance: z.number(),
  futureBalance: z.number(),
  tripBalance: z.number(),
  history: z.array(TripModel),
  lastTrip: TripModel.optional(),
}).transform(userCardBalance => {
  return {
    ...userCardBalance,
    balance: userCardBalance.history.reduce((acc, trip) => acc + trip.totalAmount, 0),
    lastTrip: userCardBalance.history[userCardBalance.history.length - 1]
  }
})