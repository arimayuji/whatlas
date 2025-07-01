export class InvalidMarginMinutesError extends Error {
  constructor(message: string = "Margin in minutes must be a number between 0 and 15") {
    super(message);
    this.name = "InvalidMarginMinutesError";
  }
}