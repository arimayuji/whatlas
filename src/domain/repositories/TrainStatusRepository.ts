import { Disclaimer, TrainStatus } from "../entities/train-status.model";

export interface TrainStatusRepository {
  getAll(): Promise<TrainStatus[]>;
  getByName(name: string): Promise<TrainStatus | null>;
}
