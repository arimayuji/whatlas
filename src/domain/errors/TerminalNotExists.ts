import { AppError } from "./app-error";

export class TerminalNotExistsError extends AppError {
  constructor(message: string) {
    super("Terminal not found");
  }
}