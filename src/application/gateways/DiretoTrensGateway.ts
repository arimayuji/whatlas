import { StatusModel } from "../../domain/entities/direto-dos-trens/status.model";

export interface DiretoTrensGateway {
  getLinesLastStatus(): Promise<StatusModel[]>;
  getLastIdsByLine(lineCode: number): Promise<{ id: number }[]>;
  getLastYearLineIds(year: number, lineCode: number): Promise<{ id: number }[]>;
  getStatusById(id: number): Promise<StatusModel>;
}