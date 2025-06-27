
import { z } from "zod/v4"

export const findNearestQuerySchema = z.object({
  tableName: z.string(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
});

export type FindNearestQuery = z.infer<typeof findNearestQuerySchema>;