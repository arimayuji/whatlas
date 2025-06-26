export interface GeoRepository {
  findNearestStop(tableName: string, lat: number, lng: number): Promise<any>;
}