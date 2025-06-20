import { z } from "zod/v4";

export const SpTransLineModel = z.object({
  cl: z.number(), // código da linha
  lc: z.boolean(),  // indica se é modo circular
  lt: z.string(), // primeira parte do letreiro da linha
  sl: z.number().int(), // sentido de operação ( 1 - terminal principal -> terminal secundário, 2 - terminal secundário -> terminal principal)
  tl: z.number().int(), // segunda parte do letreiro da linha
  tp: z.string(), // informa o letreiro descritivo da linha no sentido Terminal Principal -> Terminal Secundário
  ts: z.string(), // informa o letreiro descritivo da linha no sentido Terminal Secundário -> Terminal Principal
});

export const SpTransLinesModel = z.array(SpTransLineModel);

export type SpTransLine = z.infer<typeof SpTransLineModel>;
export type SpTransLines = z.infer<typeof SpTransLinesModel>;