export class LineNotExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LineNotFoundError";
  }
}