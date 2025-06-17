import { z } from "zod/v4";

export const SpTransCompanyModel = z.object({
  c: z.number(),
  n: z.string(),
  a: z.number(),
});

export type SpTransCompany = z.infer<typeof SpTransCompanyModel>;
