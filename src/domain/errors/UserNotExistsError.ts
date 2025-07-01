export class UserNotExistsError extends Error {
  constructor(message: string = "User does not exist") {
    super(message);
    this.name = "UserNotExistsError";
  }
}