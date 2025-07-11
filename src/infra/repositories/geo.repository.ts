import { SupabaseClient } from "@supabase/supabase-js";
import { schemasMap } from "../@types/supabase-tables.type";

export class GeoRepository implements GeoRepository {
  constructor(private readonly client: SupabaseClient) { }
  
  async findNearestStop(tableName: string, latitude: number, longitude: number) {
    const { data, error } = await this.client.rpc('find_nearest', {
      table_name: tableName,
      latitude,
      longitude,
    });

    if (error) throw new Error(error.message);
    if (!data) return null;

    const schema = schemasMap[tableName];

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    if (!schema) throw new Error(`Schema não encontrado para ${tableName}`);

    return parsed.data;
  }
}