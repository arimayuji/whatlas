import {z} from "zod/v4"

export const LastStatusSchema = z.object({
  code: z.string(),
  createdAt: z.string(), 
  description: z.string().optional(), 
  id: z.string(),
  updatedAt: z.string().optional(),
  situation: z.string(),
})

export type LastStatusModel = z.infer<typeof LastStatusSchema>