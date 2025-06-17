import { z } from "zod/v4";
import { LocationSchema } from "./user.model";

export const ScheduleModel = z.object({
  id: z.string(),
  date: z.string(),
  time: z.string(),
  origin: LocationSchema,
  destination: LocationSchema,
  calculatedDepartureTime: z.string().optional(),
  notificationSent: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Schedule = z.infer<typeof ScheduleModel>;
