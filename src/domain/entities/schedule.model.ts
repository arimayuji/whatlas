import { z } from "zod/v4";
import { LocationModel } from "./location.model";

export const ScheduleModel = z.object({
  id: z.string(),
  date: z.string(),
  time: z.string(),
  origin: LocationModel,
  destination: LocationModel,
  calculatedDepartureTime: z.string().optional(),
  notificationSent: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Schedule = z.infer<typeof ScheduleModel>;
