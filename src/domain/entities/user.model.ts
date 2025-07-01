import { z } from "zod/v4";

export const LocationSchema = z.object({
  label: z.string(),
  latitude: z.string(),
  longitude: z.string(),
});

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
  defaultOrigin: LocationSchema.optional(), 
  destinations: z.array(LocationSchema).default([]),
  marginInMinutes: z.number().min(0).default(10),
  googleCalendarConnected: z.boolean().default(false),
  googleCalendarTokens: GoogleTokensSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;