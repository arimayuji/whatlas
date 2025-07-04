import { TrainStatus } from "../../domain/entities/current-train-status.model";

export interface TrainStatusRepository {
  getAll(): Promise<TrainStatus[]>;
  getById(id: string): Promise<TrainStatus | null>;
  getStatusByLine(line: string): Promise<TrainStatus | null>;
}
