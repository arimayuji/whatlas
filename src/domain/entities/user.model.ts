import { z } from "zod/v4";
import { RechargeModelSchema } from "./recharge.model";
import { TripModelSchema } from "./trip.model";
import { UserCardBalanceModelSchema } from "./user-card-balance.model";
import { LocationModel } from "./location.model";
import { ZOD_ERRORS_MESSAGES } from "../../utils/error-messages";

export const GoogleTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.string(),
});

export type GoogleTokens = z.infer<typeof GoogleTokensSchema>;

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string().nonempty(ZOD_ERRORS_MESSAGES["string.nonempty"]),
  lastName: z.string().nonempty(ZOD_ERRORS_MESSAGES["string.nonempty"]),
  username: z.string().nonempty(ZOD_ERRORS_MESSAGES["string.nonempty"]),
  defaultOrigin: LocationModel.optional().nullable(), 
  destinations: z.array(LocationModel).optional().default([]),
  marginInMinutes: z.number().min(0).optional().default(10),
  googleCalendarConnected: z.boolean().optional().default(false),
  googleCalendarTokens: GoogleTokensSchema.optional().nullable(),
  recharges: z.array(RechargeModelSchema).optional().default([]),
  trips: z.array(TripModelSchema).optional().default([]),
  cardBalance:  UserCardBalanceModelSchema,
  createdAt: z.string().optional().default(new Date().toISOString()),
  updatedAt: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type CreateUser = z.infer<typeof CreateUserSchema>;
