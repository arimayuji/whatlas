import { z } from "zod/v4";
import { http } from "../utils/http";

import { SpTransLine, SpTransLinesModel } from "../models/sptrans-line.model";
import {
  SpTransStop,
  SpTransStopModel,
  SpTransStopResponseModel,
} from "../models/sptrans-stop.model";
import {
  SpTransCorredor,
  SpTransCorredorResponseModel,
} from "../models/sptrans-corredor.model";
import {
  SptransCompanyResponse,
  SptransCompanyResponseModel,
} from "../models/sptrans-company.model";
import {
  LinePosition,
  LinePositionResponseModel,
} from "../models/sptrans-position.model";
import {
  LineVehiclesPositions,
  LineVehiclesPositionsModel,
} from "../models/sptrans-vehicle.model";
import {
  VehicleLineETAModel,
  VehicleLineETA,
} from "../models/sptrans-eta-line.model";
import { LinesStopETAModel } from "../models/sptrans-eta-stop.model";
import {
  LineStopETA,
  LineStopETAModel,
} from "../models/sptrans-eta-stopline.model";

export const sptransService = {
  async getCompanies() {
    const res = await http.get<SptransCompanyResponse>("/Empresas");

    if (res.data.e.length === 0) {
      return [];
    }

    return SptransCompanyResponseModel.parse(res);
  },

  async getCorredores() {
    const res = await http.get<SpTransCorredor[]>("/Corredores");

    if (res.data.length === 0) {
      return [];
    }

    return SpTransCorredorResponseModel.parse(res);
  },

  async searchLines(term: string) {
    const res = await http.get<SpTransLine[]>(
      `/Linha/Buscar?termosBusca=${term}`
    );

    if (res.data.length === 0) {
      return [];
    }

    return SpTransLinesModel.parse(res);
  },

  async searchLineWithDirection(term: string, direction: 1 | 2) {
    const res = await http.get<SpTransLine[]>(
      `/Linha/BuscarLinhaSentido?termosBusca=${term}&sentido=${direction}`
    );

    return SpTransLinesModel.parse(res);
  },

  async getStopsByTerm(term: string) {
    const res = await http.get<SpTransStop[]>(
      `/Parada/Buscar?termosBusca=${term}`
    );

    return SpTransStopResponseModel.parse(res);
  },

  async getStopsByLine(lineCode: number) {
    const res = await http.get<SpTransStop[]>(
      `/Parada/BuscarParadasPorLinha?codigoLinha=${lineCode}`
    );

    return SpTransStopResponseModel.parse(res);
  },

  async getStopsByCorredor(corredorCode: number) {
    const res = await http.get<SpTransStop[]>(
      `/Parada/BuscarParadasPorCorredor?codigoCorredor=${corredorCode}`
    );

    return z.array(SpTransStopModel).parse(res);
  },

  async getVehiclePositions() {
    const res = await http.get<LinePosition>("/Posicao");

    return LinePositionResponseModel.parse(res);
  },

  async getVehiclePositionsByLine(lineCode: number) {
    const res = await http.get<LineVehiclesPositions>(
      `/Posicao/Linha?codigoLinha=${lineCode}`
    );

    return LineVehiclesPositionsModel.parse(res);
  },

  async getArrivalPrediction(stopCode: number, lineCode: number) {
    const res = await http.get<LineStopETA>(
      `/Previsao?codigoParada=${stopCode}&codigoLinha=${lineCode}`
    );

    return LineStopETAModel.parse(res);
  },

  async getArrivalPredictionByLine(lineCode: number) {
    const res = await http.get<VehicleLineETA>(
      `/Previsao/Linha?codigoLinha=${lineCode}`
    );

    return VehicleLineETAModel.parse(res);
  },

  async getArrivalPredictionByStop(stopCode: number) {
    const res = await http.get<LineStopETA>(
      `/Previsao/Parada?codigoParada=${stopCode}`
    );

    return LinesStopETAModel.parse(res);
  },
};
