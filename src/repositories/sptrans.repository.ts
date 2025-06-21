import { SptransCompanyResponse } from "../models/sptrans-company.model";
import { SpTransCorredor } from "../models/sptrans-corredor.model";
import { VehicleLineETA } from "../models/sptrans-eta-line.model";
import { LineStopETA } from "../models/sptrans-eta-stop.model";
import { SpTransLine } from "../models/sptrans-line.model";
import { LinePosition } from "../models/sptrans-position.model";
import { SpTransStop } from "../models/sptrans-stop.model";
import { LineVehiclesPositions } from "../models/sptrans-vehicle.model";
import { http } from "../utils/http";

export const sptransRepository = {
  getCompanies: () => http.get<SptransCompanyResponse>("/Empresas"),
  getCorredores: () => http.get<SpTransCorredor[]>("/Corredores"),
  searchLines: (term: string) =>
    http.get<SpTransLine[]>(`/Linha/Buscar?termosBusca=${term}`),
  searchLineWithDirection: (term: string, direction: 1 | 2) =>
    http.get<SpTransLine[]>(
      `/Linha/BuscarLinhaSentido?termosBusca=${term}&sentido=${direction}`
    ),
  getStopsByTerm: (term: string) =>
    http.get<SpTransStop[]>(`/Parada/Buscar?termosBusca=${term}`),
  getStopsByLine: (lineCode: number) =>
    http.get<SpTransStop[]>(
      `/Parada/BuscarParadasPorLinha?codigoLinha=${lineCode}`
    ),
  getStopsByCorredor: (corredorCode: number) =>
    http.get<SpTransStop[]>(
      `/Parada/BuscarParadasPorCorredor?codigoCorredor=${corredorCode}`
    ),
  getVehiclePositions: () => http.get<LinePosition>("/Posicao"),
  getVehiclePositionsByLine: (lineCode: number) =>
    http.get<LineVehiclesPositions>(`/Posicao/Linha?codigoLinha=${lineCode}`),
  getArrivalPrediction: (stopCode: number, lineCode: number) =>
    http.get<LineStopETA>(
      `/Previsao?codigoParada=${stopCode}&codigoLinha=${lineCode}`
    ),
  getArrivalPredictionByLine: (lineCode: number) =>
    http.get<VehicleLineETA>(`/Previsao/Linha?codigoLinha=${lineCode}`),
  getArrivalPredictionByStop: (stopCode: number) =>
    http.get<LineStopETA>(`/Previsao/Parada?codigoParada=${stopCode}`),
};
