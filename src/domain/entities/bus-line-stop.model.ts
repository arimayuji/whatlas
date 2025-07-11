import { z } from "zod/v4";

export const BusStopModel = z.object({
  stopId: z.string(),
  stopName: z.string(),
  stopLat: z.number(),
  stopLon: z.number(),
  stopSequence: z.number(),
  estacaoInicio: z.string(),
  estacaoFim: z.string(),
})
export type BusStop = z.infer<typeof BusStopModel>

export const BusStopsModel = z.array(BusStopModel)
export type BusStops = z.infer<typeof BusStopsModel>


export const BusLineModel = z.object({
  routeShortName: z.string(),
  routeLongName: z.string(),
  estacaoInicio: z.string(),
  estacaoFim: z.string(),
})
export type BusLine = z.infer<typeof BusLineModel>

export const BusLinesModel = z.array(BusLineModel)
export type BusLines = z.infer<typeof BusLinesModel>

