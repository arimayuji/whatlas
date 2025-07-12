import { z } from "zod/v4";

export const BusStopModel = z.object({
  stop_id: z.string(),
  stop_name: z.string(),
  stop_lat: z.number(),
  stop_lon: z.number(),
  stop_sequence: z.number(),
  estacao_inicio: z.string(),
  estacao_fim: z.string(),
})
export type BusStop = z.infer<typeof BusStopModel>

export const BusStopsModel = z.array(BusStopModel)
export type BusStops = z.infer<typeof BusStopsModel>


export const BusLineModel = z.object({
  route_short_name: z.string(),
  route_long_name: z.string(),
  estacao_inicio: z.string(),
  estacao_fim: z.string(),
})
export type BusLine = z.infer<typeof BusLineModel>

export const BusLinesModel = z.array(BusLineModel)
export type BusLines = z.infer<typeof BusLinesModel>

