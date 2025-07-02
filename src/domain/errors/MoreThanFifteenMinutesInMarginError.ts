import { AppError } from "./app-error";

export class MoreThanFifteenMinutesInMarginError extends AppError {
  constructor(message: string = "Margin in minutes cannot be more than 15 minutes",code = 422) {
    super(message,code);
    this.name = "MoreThanFifteenMinutesInMarginError";
  }
}