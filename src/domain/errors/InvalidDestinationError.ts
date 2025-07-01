export class InvalidDestinationError extends Error {
  constructor(message: string = "Invalid destination provided") {
    super(message);
    this.name = "InvalidDestinationError";
  }
}