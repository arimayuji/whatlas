
import { z } from "zod/v4"

export const busLineStopsSchema = z.object({
  busline: z.string().nonempty(),
});
export type BusLineStopsQuery = z.infer<typeof busLineStopsSchema>;

export const terminalBusLinesSchema = z.object({
  terminal: z.string().nonempty(),
});
export type TerminalBusLinesQuery = z.infer<typeof terminalBusLinesSchema>;