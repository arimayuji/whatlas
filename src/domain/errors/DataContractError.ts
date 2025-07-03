import { AppError } from "./app-error";

export class DataContractError extends AppError{
  constructor(message: string = "Data contract error", code = 400) {
    super(message, code);
  }
}