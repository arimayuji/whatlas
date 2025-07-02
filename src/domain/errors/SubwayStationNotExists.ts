export class SubwayStationNotExistsError extends Error {
  constructor(message: string) {
    super("Subway station not found");
  }
}