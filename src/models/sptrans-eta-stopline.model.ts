import { z } from "zod/v4";
import { StopETAModel } from "./sptrans-eta-stop.model";

export const LineStopETAModel = z.object({
  hr: z.string(), // horário de referência da geração da resposta
  p: z.array(StopETAModel),
});

export type LineStopETA = z.infer<typeof LineStopETAModel>;
