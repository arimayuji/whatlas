export class TerminalNotExistsError extends Error {
  constructor(message: string) {
    super("Terminal not found");
  }
}