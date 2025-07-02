import { AppError } from "./app-error";

export class SubwayStationNotExistsError extends AppError {
  constructor(message: string) {
    super("Subway station not found");
  }
}