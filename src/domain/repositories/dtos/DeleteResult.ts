// src/domain/repositories/dtos/DeleteResult.ts
export interface DeleteResult {
  success: boolean;
  message?: string;
  deletedId?: string;
}
