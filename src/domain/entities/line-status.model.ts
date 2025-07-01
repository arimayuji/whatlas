import { z } from "zod/v4";

export const LineStatusModel = z.object({
  lineId: z.string(),
  status: z.enum(["Normal", "Parcial", "Interrompida"]),
  updatedAt: z.string(),
});

export type LineStatus = z.infer<typeof LineStatusModel>;
