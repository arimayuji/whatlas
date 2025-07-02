import { z } from "zod/v4";

export const RechargeModelSchema = z.object({
  id: z.string(),
  rechargeAmount: z.number().nonnegative(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Recharge = z.infer<typeof RechargeModelSchema>