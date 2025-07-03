import { AppError } from "./app-error";

export class InfrastructureError extends AppError{
  constructor(message: string = "Infraestructure error", statusCode = 500) {
    super(message, statusCode);
    this.name = "InfraestructureError";
  }
}