import { AppError } from "./app-error";

export class UserAlreadyExistsError extends AppError {
  constructor(message: string = "User already exists",code = 409) {
    super(message,code);
    this.name = "UserAlreadyExistsError";
  }
}