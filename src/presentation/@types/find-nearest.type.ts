
import { z } from "zod/v4"

export const findNearestQuerySchema = z.object({
  tableName: z.string(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
});

export type FindNearestQuery = z.infer<typeof findNearestQuerySchema>;