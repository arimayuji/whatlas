import { z } from "zod/v4";

export const VehicleETAModel = z.object({
  p: z.string(), // prefixo do veículo
  t: z.string(), // horário de chegada estimado
  a: z.boolean(), // acessibilidade
  ta: z.string(), // horário em que a localização foi capturada
  px: z.number(), // longitude
  py: z.number(), // latitude
});

export const LineETAModel = z.object({
  cp: z.number(), // código da parada
  np: z.string(), // nome da parada
  py: z.number(), // latitude
  px: z.number(), // longitude
  vs: z.array(VehicleETAModel),
});

export const VehicleLineETAModel = z.object({
  hr: z.string(), // horário de referência da geração da resposta
  ps: z.array(LineETAModel),
});

export type VehicleETA = z.infer<typeof VehicleETAModel>;
export type LineETA = z.infer<typeof LineETAModel>;
export type VehicleLineETA = z.infer<typeof VehicleLineETAModel>;
