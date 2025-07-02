import { AppError } from "./app-error";

export class LineNotExistsError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "LineNotFoundError";
  }
}