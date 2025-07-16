import { z } from "zod/v4";

export const TrainStatusModel = z.object({
  id: z.string(),
  nome: z.string(),
  status: z.string(),
  horario: z.string(),
  disclaimer: z.string().optional(),
})

export type TrainStatus = z.infer<typeof TrainStatusModel>

export type TrainStatusList = TrainStatus[]

export const DisclaimerModel = z.object({
  nome: z.string(),
  disclaimer: z.string().optional()
})

export type Disclaimer = z.infer<typeof DisclaimerModel>

export  type DisclaimerList = Disclaimer[]