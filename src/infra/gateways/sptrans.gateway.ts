import { SpTransGateway } from "../../application/gateways/SpTransGateway";
import { http } from "../../utils/http";
import {
  SptransCompanyResponse,
  SptransCompanyResponseModel,
} from "../../domain/entities/sptrans-company.model";
import {
  SpTransCorredor,
  SpTransCorredorResponseModel,
} from "../../domain/entities/sptrans-corredor.model";
import { SpTransLine, SpTransLinesModel } from "../../domain/entities/sptrans-line.model";
import { SpTransStop, SpTransStopResponseModel } from "../../domain/entities/sptrans-stop.model";
import { LinePosition, LinePositionResponseModel } from "../../domain/entities/sptrans-position.model";
import { LineVehiclesPositions, LineVehiclesPositionsModel } from "../../domain/entities/sptrans-vehicle.model";
import { LinesStopETAModel, LineStopETA } from "../../domain/entities/sptrans-eta-stop.model";
import { VehicleLineETA, VehicleLineETAModel } from "../../domain/entities/sptrans-eta-line.model";
import { parseOrNull } from "../../utils/parse-or-null";

export class SpTransHttpGateway implements SpTransGateway {
  private readonly client = http;

  async getCompanies(): Promise<SptransCompanyResponse | null> {
    const { data } = await this.client.get<unknown>("/Empresas");

    return parseOrNull(SptransCompanyResponseModel, data, console);
  }

  async getCorredores(): Promise<SpTransCorredor[] | null> {
    const { data } = await this.client.get<unknown>("/Corredores");

    return parseOrNull(SpTransCorredorResponseModel, data, console);
  }

  async searchLines(term: string): Promise<SpTransLine[] | null> {
    const { data } = await this.client.get<unknown>(
      "/Linha/Buscar",
      { params: { termosBusca: term } }
    );

    return parseOrNull(SpTransLinesModel , data, console);
  }

  async searchLineWithDirection(
    term: string,
    direction: 1 | 2
  ): Promise<SpTransLine[] | null> {
    const { data } = await this.client.get<unknown>(
      "/Linha/BuscarLinhaSentido",
      { params: { termosBusca: term, sentido: direction } }
    );
    return parseOrNull(SpTransLinesModel, data, console);
  }

  async getStopsByTerm(term: string): Promise<SpTransStop[] | null> {
    const { data } = await this.client.get<unknown>(
      "/Parada/Buscar",
      { params: { termosBusca: term } }
    );

    return parseOrNull(SpTransStopResponseModel, data, console);
  }

  async getStopsByLine(lineCode: number): Promise<SpTransStop[] | null> {
    const { data } = await this.client.get<unknown>(
      "/Parada/BuscarParadasPorLinha",
      { params: { codigoLinha: lineCode } }
    );

    return parseOrNull(SpTransStopResponseModel, data, console);
  }

  async getStopsByCorredor(corredorCode: number): Promise<SpTransStop[] | null> {
    const { data } = await this.client.get<unknown>(
      "/Parada/BuscarParadasPorCorredor",
      { params: { codigoCorredor: corredorCode } }
    );

    return parseOrNull(SpTransStopResponseModel, data, console);
  }

  async getVehiclePositions(): Promise<LinePosition | null> {
    const { data } = await this.client.get<unknown>("/Posicao");

    return parseOrNull( LinePositionResponseModel, data, console);
  }

  async getVehiclePositionsByLine(
    lineCode: number
  ): Promise<LineVehiclesPositions | null> {
    const { data } = await this.client.get<unknown>(
      "/Posicao/Linha",
      { params: { codigoLinha: lineCode } }
    );

    return parseOrNull(LineVehiclesPositionsModel, data, console);
  }

  async getArrivalPrediction(
    stopCode: number,
    lineCode: number
  ): Promise<LineStopETA | null> {
    const { data } = await this.client.get<unknown>(
      "/Previsao",
      { params: { codigoParada: stopCode, codigoLinha: lineCode } }
    );
    return parseOrNull(LinesStopETAModel, data, console);
  }

  async getArrivalPredictionByLine(
    lineCode: number
  ): Promise<VehicleLineETA | null> {
    const { data } = await this.client.get<unknown>(
      "/Previsao/Linha",
      { params: { codigoLinha: lineCode } }
    );
    return parseOrNull(VehicleLineETAModel, data, console);
  }

  async getArrivalPredictionByStop(
    stopCode: number
  ): Promise<LineStopETA | null> {
    const { data } = await this.client.get<unknown>(
      "/Previsao/Parada",
      { params: { codigoParada: stopCode } }
    );
    return parseOrNull(LinesStopETAModel, data, console);
  }
}
