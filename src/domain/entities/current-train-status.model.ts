import { z } from "zod/v4";

export const TrainStatusSchema = z.object({
  line: z.string(),
  status: z.string(),
  updatedAt: z.string(),
});

export type TrainStatus = z.infer<typeof TrainStatusSchema>;
export const TrainStatusListSchema = z.array(TrainStatusSchema);
export type TrainStatusList = z.infer<typeof TrainStatusListSchema>;
