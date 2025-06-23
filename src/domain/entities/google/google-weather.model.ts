import { z } from "zod/v4";

export const WeatherResponseSchema = z.object({
  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
    })
  ),
  main: z.object({
    temp: z.number(),
    humidity: z.number(),
  }),
  name: z.string(),
});

export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;
