import { z } from "zod/v4";

export const LocationSchema = z.object({
  label: z.string(),
  lat: z.number(),
  lng: z.number(),
});

export const GoogleTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.string(),
});

export const UserModel = z.object({
  id: z.string(),
  phone: z.string().regex(/^\+\d{10,15}$/),
  defaultOrigin: LocationSchema,
  destinations: z.array(LocationSchema),
  marginInMinutes: z.number().min(0).default(10),
  googleCalendarConnected: z.boolean(),
  googleCalendarTokens: GoogleTokensSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof UserModel>;
