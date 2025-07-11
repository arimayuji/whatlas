import { BusLines, BusStops } from "../entities/bus-line-stop.model";

export interface BusRepository {
  getAllBusLineOfTerminal(term: string): Promise<BusLines>;
  getAllStopsOfBusLine(term: string): Promise<BusStops>;
}