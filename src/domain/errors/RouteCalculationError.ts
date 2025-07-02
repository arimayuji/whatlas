import { AppError } from "./app-error";

export class RouteCalculationError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "RouteCalculationError";
  }
}