import { z } from "zod/v4";

export const TransitStepSchema = z.object({
  travel_mode: z.string(),
  html_instructions: z.string(),
  duration: z.object({
    text: z.string(),
    value: z.number(),
  }),
});

export const LegSchema = z.object({
  duration: z.object({
    text: z.string(),
    value: z.number(),
  }),
  distance: z.object({
    text: z.string(),
    value: z.number(),
  }),
  steps: z.array(TransitStepSchema),
});

export const RouteSchema = z.object({
  summary: z.string(),
  legs: z.array(LegSchema),
});

export const DirectionsResponseSchema = z.object({
  routes: z.array(RouteSchema),
  status: z.string(),
});

export type DirectionsResponse = z.infer<typeof DirectionsResponseSchema>;
