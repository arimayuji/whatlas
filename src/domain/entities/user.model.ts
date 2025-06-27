import { z } from "zod/v4";

export const LocationSchema = z.object({
  label: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export const GoogleTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.string(),
});

export const UserBaseSchema = z.object({
  phone: z.string().regex(/^\+\d{10,15}$/),
  defaultOrigin: LocationSchema.optional(), 
  destinations: z.array(LocationSchema).default([]),
  marginInMinutes: z.number().min(0).default(10),
  googleCalendarConnected: z.boolean().default(false),
  googleCalendarTokens: GoogleTokensSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const UserSchema = UserBaseSchema.extend({
  id: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type CreateUserInput = z.infer<typeof UserBaseSchema>;
