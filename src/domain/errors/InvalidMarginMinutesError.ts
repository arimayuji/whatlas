import { AppError } from "./app-error";

export class InvalidMarginMinutesError extends AppError {
  constructor(message: string = "Margin in minutes must be a number between 0 and 15",code = 400) {
    super(message,code);
    this.name = "InvalidMarginMinutesError";
  }
}