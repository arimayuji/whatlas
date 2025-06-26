import { SupabaseClient } from "@supabase/supabase-js";
import { schemasMap } from "../@types/supabase-tables.type";

export class GeoRepository implements GeoRepository {
  constructor(private readonly client: SupabaseClient) { }
  
  async findNearestStop(tableName: string, lat: number, lng: number) {
    const { data, error } = await this.client.rpc('find_nearest', {
      table_name: tableName,
      lat,
      lng,
    });

    if (error) throw new Error(error.message);
    if (!data) return null;

    const schema = schemasMap[tableName];
    if (!schema) throw new Error(`Schema não encontrado para ${tableName}`);

    return schema.parse(data);
  }
}