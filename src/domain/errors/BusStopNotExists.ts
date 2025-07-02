import { AppError } from "./app-error";

export class BusStopNotExistsError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "BusStopNotFoundError";
  }
}