export class MoreThanThreeDestinationsError extends Error {
  constructor(message: string = "You can only have up to three destinations") {
    super(message);
    this.name = "MoreThanThreeDestinationsError";
  }
}