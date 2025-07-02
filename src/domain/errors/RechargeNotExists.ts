export class RechargeNotExists extends Error {
  constructor(message: string = "Recharge not exists") {
    super(message);
    this.name = "RechargeNotExistsError";
  }
}