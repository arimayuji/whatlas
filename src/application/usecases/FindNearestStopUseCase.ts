import { GeoRepository } from "../../domain/repositories/GeoRepository";
import { schemasMap } from "../../infra/@types/supabase-tables.type";

interface FindNearestStopDTO {
  tableName: keyof typeof schemasMap;
  latitude: number;
  longitude: number;
}

export class FindNearestStopUseCase {
  constructor(private readonly geoRepository: GeoRepository) {}

  async execute({ tableName, latitude, longitude }: FindNearestStopDTO) {
    return this.geoRepository.findNearestStop(tableName, latitude, longitude);
  }
}
