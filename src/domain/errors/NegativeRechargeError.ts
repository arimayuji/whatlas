import { AppError } from "./app-error";

export class NegativeRechargeError extends AppError {
  constructor(message: string = "Recharge amount cannot be negative", code = 400) {
    super(message,code);
    this.name = "NegativeRechargeError";
  }
}