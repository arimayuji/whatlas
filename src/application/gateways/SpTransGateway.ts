import { SptransCompanyResponse } from "../../domain/entities/sptrans-company.model";
import { SpTransCorredor } from "../../domain/entities/sptrans-corredor.model";
import { VehicleLineETA } from "../../domain/entities/sptrans-eta-line.model";
import { LineStopETA } from "../../domain/entities/sptrans-eta-stop.model";
import { SpTransLines } from "../../domain/entities/sptrans-line.model";
import { LinePosition } from "../../domain/entities/sptrans-position.model";
import { SpTransStop } from "../../domain/entities/sptrans-stop.model";
import { LineVehiclesPositions } from "../../domain/entities/sptrans-vehicle.model";

export interface SpTransGateway {
  getCompanies(): Promise<SptransCompanyResponse | null>;
  getCorredores(): Promise<SpTransCorredor[] | null>;
  searchLines(term: string): Promise<SpTransLines | null>;
  searchLineWithDirection(
    term: string,
    direction: 1 | 2
  ): Promise<SpTransLines | null>;
  getStopsByTerm(term: string): Promise<SpTransStop[] | null>;
  getStopsByLine(lineCode: number): Promise<SpTransStop[] | null>;
  getStopsByCorredor(corredorCode: number): Promise<SpTransStop[] | null>;
  getVehiclePositions(): Promise<LinePosition | null>;
  getVehiclePositionsByLine(lineCode: number): Promise<LineVehiclesPositions | null>;
  getArrivalPrediction(
    stopCode: number,
    lineCode: number
  ): Promise<LineStopETA | null>;
  getArrivalPredictionByLine(lineCode: number): Promise<VehicleLineETA | null>;
  getArrivalPredictionByStop(stopCode: number): Promise<LineStopETA | null>;
}
