export class NegativeRechargeError extends Error {
  constructor(message: string = "Recharge amount cannot be negative") {
    super(message);
    this.name = "NegativeRechargeError";
  }
}