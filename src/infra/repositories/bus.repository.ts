import { SupabaseClient } from "@supabase/supabase-js";
import { BusLines, BusLinesModel, BusStops,BusStopsModel } from "../../domain/entities/bus-line-stop.model";
import { BusRepository } from "../../domain/repositories/BusRepository";

export class BusRepositoryFirebaseSupabase implements BusRepository{
  constructor(private readonly client: SupabaseClient) { }

  async getAllBusLineOfTerminal(term: string): Promise<BusLines> {
    const {data, error} = await this.client.rpc('get_lines_by_terminal', { terminal_name: term })

    if(error) throw new Error(error.message);
    if (!data) return [];
    
    const parsed = BusLinesModel.safeParse(data);

    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    return parsed.data
  }

  async getAllStopsOfBusLine(term: string): Promise<BusStops> {
    const { data, error } = await this.client
    .rpc('get_bus_stops', { input_text: term })

    if(error) throw new Error(error.message);
    if (!data) return [];

    const parsed = BusStopsModel.safeParse(data);

    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    return parsed.data
  }
}