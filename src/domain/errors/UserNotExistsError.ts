import { AppError } from "./app-error";

export class UserNotExistsError extends AppError {
  constructor(message: string = "User does not exist", code = 404) {
    super(message, code);
  }
}