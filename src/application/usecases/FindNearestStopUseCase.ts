import { GeoRepository } from "../../domain/repositories/GeoRepository";
import { schemasMap } from "../../infra/@types/supabase-tables.type";
import { logger } from "../../infra/logger";

interface FindNearestStopDTO {
  tableName: keyof typeof schemasMap;
  latitude: number;
  longitude: number;
}

export class FindNearestStopUseCase {
  constructor(private readonly geoRepository: GeoRepository) {}

  async execute({ tableName, latitude, longitude }: FindNearestStopDTO) {
    const nearestStop = await this.geoRepository.findNearestStop(tableName, latitude, longitude);

    logger.info(`[Geo] Nearest stop found`, {
      stop: nearestStop,
    })

    return nearestStop;
  }
}
