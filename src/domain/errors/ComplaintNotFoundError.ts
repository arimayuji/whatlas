import { AppError } from "./app-error";

export class ComplaintNotFoundError extends AppError{
  constructor() {
    super("Complaint not found", 404);
  }
}