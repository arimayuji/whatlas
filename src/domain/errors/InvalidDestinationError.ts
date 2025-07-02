import { AppError } from "./app-error";

export class InvalidDestinationError extends AppError {
  constructor(message: string = "Invalid destination provided",code = 400) {
    super(message,code);
    this.name = "InvalidDestinationError";
  }
}