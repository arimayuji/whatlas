import { z } from "zod/v4";
import { TRIP_VEHICLE, VEHICLE_TICKETS_PRICES } from "./trip.model";

export const UserCardBalanceModel = z.object({
  userId: z.string(),
  currentBalance: z.number().default(0),
  remainingBusTickets: z.number().nonnegative(),
  remainingSubwayTickets: z.number().nonnegative(),
  createdAt: z.string(),
  updatedAt: z.string(),
}).transform(userCardBalance => {
  return {
    ...userCardBalance,
    remainingBusTickets: userCardBalance.currentBalance / VEHICLE_TICKETS_PRICES[TRIP_VEHICLE.enum.BUS],
    remainingSubwayTickets: userCardBalance.currentBalance / VEHICLE_TICKETS_PRICES[TRIP_VEHICLE.enum.SUBWAY],
  }
})

export type UserCardBalance = z.infer<typeof UserCardBalanceModel>