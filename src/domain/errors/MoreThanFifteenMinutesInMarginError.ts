export class MoreThanFifteenMinutesInMarginError extends Error {
  constructor(message: string = "Margin in minutes cannot be more than 15 minutes") {
    super(message);
    this.name = "MoreThanFifteenMinutesInMarginError";
  }
}