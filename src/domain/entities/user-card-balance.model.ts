import { z } from "zod/v4";
import { TRIP_VEHICLE, VEHICLE_TICKETS_PRICES } from "./trip.model";
import { ZOD_ERRORS_MESSAGES } from "../../utils/error-messages";

export const UserCardBalanceModelSchema = z.object({
  currentBalance: z.number().nonnegative().default(0),
  remainingBusTickets: z.number().nonnegative().default(0),
  remainingSubwayTickets: z.number().nonnegative({error: ZOD_ERRORS_MESSAGES["number.nonnegative"]}).default(0),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
}).transform(userCardBalance => {
  return {
    ...userCardBalance,
    remainingBusTickets: userCardBalance.currentBalance / VEHICLE_TICKETS_PRICES[TRIP_VEHICLE.enum.BUS],
    remainingSubwayTickets: userCardBalance.currentBalance / VEHICLE_TICKETS_PRICES[TRIP_VEHICLE.enum.SUBWAY],
  }
})

export type UserCardBalance = z.infer<typeof UserCardBalanceModelSchema>