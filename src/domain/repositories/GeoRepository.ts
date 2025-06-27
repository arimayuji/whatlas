export interface GeoRepository {
  findNearestStop(tableName: string, latitude: number, longitude: number): Promise<any>;
}