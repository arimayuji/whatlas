import { SpTransGateway } from "../../application/gateways/SpTransGateway";
import { http } from "../../utils/http";

import { SptransCompanyResponse } from "../../domain/entities/sptrans-company.model";
import { SpTransCorredor } from "../../domain/entities/sptrans-corredor.model";
import { SpTransLine } from "../../domain/entities/sptrans-line.model";
import { SpTransStop } from "../../domain/entities/sptrans-stop.model";
import { LinePosition } from "../../domain/entities/sptrans-position.model";
import { LineVehiclesPositions } from "../../domain/entities/sptrans-vehicle.model";
import { LineStopETA } from "../../domain/entities/sptrans-eta-stop.model";
import { VehicleLineETA } from "../../domain/entities/sptrans-eta-line.model";

export class SpTransHttpGateway implements SpTransGateway {
  async getCompanies(): Promise<SptransCompanyResponse> {
    const res = await http.get<SptransCompanyResponse>("/Empresas");
    return res.data;
  }

  async getCorredores(): Promise<SpTransCorredor[]> {
    const res = await http.get<SpTransCorredor[]>("/Corredores");
    return res.data;
  }

  async searchLines(term: string): Promise<SpTransLine[]> {
    const res = await http.get<SpTransLine[]>(
      `/Linha/Buscar?termosBusca=${term}`
    );
    return res.data;
  }

  async searchLineWithDirection(
    term: string,
    direction: 1 | 2
  ): Promise<SpTransLine[]> {
    const res = await http.get<SpTransLine[]>(
      `/Linha/BuscarLinhaSentido?termosBusca=${term}&sentido=${direction}`
    );

    return res.data;
  }

  async getStopsByTerm(term: string): Promise<SpTransStop[]> {
    const res = await http.get<SpTransStop[]>(
      `/Parada/Buscar?termosBusca=${term}`
    );
    return res.data;
  }

  async getStopsByLine(lineCode: number): Promise<SpTransStop[]> {
    const res = await http.get<SpTransStop[]>(
      `/Parada/BuscarParadasPorLinha?codigoLinha=${lineCode}`
    );
    return res.data;
  }

  async getStopsByCorredor(corredorCode: number): Promise<SpTransStop[]> {
    const rest = await http.get<SpTransStop[]>(
      `/Parada/BuscarParadasPorCorredor?codigoCorredor=${corredorCode}`
    );
    return rest.data;
  }

  async getVehiclePositions(): Promise<LinePosition> {
    const res = await http.get<LinePosition>("/Posicao");
    return res.data;
  }

  async getVehiclePositionsByLine(
    lineCode: number
  ): Promise<LineVehiclesPositions> {
    const res = await http.get<LineVehiclesPositions>(
      `/Posicao/Linha?codigoLinha=${lineCode}`
    );
    return res.data;
  }

  async getArrivalPrediction(
    stopCode: number,
    lineCode: number
  ): Promise<LineStopETA> {
    const res = await http.get<LineStopETA>(
      `/Previsao?codigoParada=${stopCode}&codigoLinha=${lineCode}`
    );
    return res.data;
  }

  async getArrivalPredictionByLine(lineCode: number): Promise<VehicleLineETA> {
    const res = await http.get<VehicleLineETA>(
      `/Previsao/Linha?codigoLinha=${lineCode}`
    );
    return res.data;
  }

  async getArrivalPredictionByStop(stopCode: number): Promise<LineStopETA> {
    const res = await http.get<LineStopETA>(
      `/Previsao/Parada?codigoParada=${stopCode}`
    );
    return res.data;
  }
}
