import { AppError } from "./app-error";

export class RechargeNotExists extends AppError {
  constructor(message: string = "Recharge not exists", code = 404) {
    super(message, code);
    this.name = "RechargeNotExistsError";
  }
}