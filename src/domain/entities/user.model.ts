import { z } from "zod/v4";
import { RechargeModelSchema } from "./recharge.model";
import { TripModelSchema } from "./trip.model";
import { UserCardBalanceModelSchema } from "./user-card-balance.model";
import { LocationModel } from "./location.model";

export const GoogleTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  defaultOrigin: LocationModel.optional(), 
  destinations: z.array(LocationModel).default([]),
  marginInMinutes: z.number().min(0).default(10),
  googleCalendarConnected: z.boolean().default(false),
  googleCalendarTokens: GoogleTokensSchema.optional(),
  recharges: z.array(RechargeModelSchema).default([]),
  trips: z.array(TripModelSchema).default([]),
  cardBalance:  UserCardBalanceModelSchema,
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;