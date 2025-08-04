import { z } from "zod/v4"

export const StatusSchema = z.object({
  code: z.number(),
  createdAt: z.string(), 
  description: z.string().optional(), 
  id: z.number(),
  situation: z.string(),
})

export type StatusModel = z.infer<typeof StatusSchema>