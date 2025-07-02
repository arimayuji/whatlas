import { AppError } from "./app-error";

export class MoreThanThreeDestinationsError extends AppError {
  constructor(message: string = "You can only have up to three destinations", code = 422) {
    super(message, code);
    this.name = "MoreThanThreeDestinationsError";
  }
}