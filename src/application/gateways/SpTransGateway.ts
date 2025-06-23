import { SptransCompanyResponse } from "../../domain/entities/sptrans-company.model";
import { SpTransCorredor } from "../../domain/entities/sptrans-corredor.model";
import { VehicleLineETA } from "../../domain/entities/sptrans-eta-line.model";
import { LineStopETA } from "../../domain/entities/sptrans-eta-stop.model";
import { SpTransLines } from "../../domain/entities/sptrans-line.model";
import { LinePosition } from "../../domain/entities/sptrans-position.model";
import { SpTransStop } from "../../domain/entities/sptrans-stop.model";
import { LineVehiclesPositions } from "../../domain/entities/sptrans-vehicle.model";

export interface SpTransGateway {
  getCompanies(): Promise<SptransCompanyResponse>;
  getCorredores(): Promise<SpTransCorredor[]>;
  searchLines(term: string): Promise<SpTransLines>;
  searchLineWithDirection(
    term: string,
    direction: 1 | 2
  ): Promise<SpTransLines>;
  getStopsByTerm(term: string): Promise<SpTransStop[]>;
  getStopsByLine(lineCode: number): Promise<SpTransStop[]>;
  getStopsByCorredor(corredorCode: number): Promise<SpTransStop[]>;
  getVehiclePositions(): Promise<LinePosition>;
  getVehiclePositionsByLine(lineCode: number): Promise<LineVehiclesPositions>;
  getArrivalPrediction(
    stopCode: number,
    lineCode: number
  ): Promise<LineStopETA>;
  getArrivalPredictionByLine(lineCode: number): Promise<VehicleLineETA>;
  getArrivalPredictionByStop(stopCode: number): Promise<LineStopETA>;
}
