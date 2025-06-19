import { z } from "zod/v4";
import { http } from "../utils/http";

import { SpTransLineResponseModel } from "../models/sptrans-line.model";
import {
  SpTransStopModel,
  SpTransStopResponseModel,
} from "../models/sptrans-stop.model";
import { ScheduleModel } from "../models/schedule.model";
import { SpTransCorredorResponseModel } from "../models/sptrans-corredor.model";
import { SptransCompanyResponseModel } from "../models/sptrans-company.model";
import { LinePositionModel } from "../models/sptrans-position.model";
import { LineVehiclesPositionsModel } from "../models/sptrans-vehicle.model";
import { VehicleLineETAModel } from "../models/sptrans-eta-line.model";
import { LinesStopETAModel } from "../models/sptrans-eta-stop.model";

export const sptransService = {
  async getCompanies() {
    const res = await http.get("/Empresa");

    return SptransCompanyResponseModel.parse(res);
  },

  async getCorredores() {
    const res = await http.get("/Corredor");

    return SpTransCorredorResponseModel.parse(res);
  },

  async searchLines(term: string) {
    const res = await http.get(`/Linha/Buscar?termosBusca=${term}`);

    return SpTransLineResponseModel.parse(res);
  },

  async searchLineWithDirection(term: string, direction: 1 | 2) {
    const res = await http.get(
      `/Linha/BuscarLinhaSentido?termosBusca=${term}&sentido=${direction}`
    );
    return SpTransLineResponseModel.parse(res);
  },

  async getStopsByTerm(term: string) {
    const res = await http.get(`/Parada/Buscar?termosBusca=${term}`);
    return SpTransStopResponseModel.parse(res);
  },

  async getStopsByLine(lineCode: number) {
    const res = await http.get(
      `/Parada/BuscarParadasPorLinha?codigoLinha=${lineCode}`
    );
    return SpTransStopResponseModel.parse(res);
  },

  async getStopsByCorredor(corredorCode: number) {
    const res = await http.get(
      `/Parada/BuscarParadasPorCorredor?codigoCorredor=${corredorCode}`
    );
    return z.array(SpTransStopModel).parse(res);
  },

  async getVehiclePositions() {
    const res = await http.get("/Posicao");

    return LinePositionModel.parse(res);
  },

  async getVehiclePositionsByLine(lineCode: number) {
    const res = await http.get(`/Posicao/Linha?codigoLinha=${lineCode}`);

    return LineVehiclesPositionsModel.parse(res);
  },

  async getArrivalPrediction(stopCode: number, lineCode: number) {
    const res = await http.get(
      `/Previsao?codigoParada=${stopCode}&codigoLinha=${lineCode}`
    );

    return ScheduleModel.parse(res);
  },

  async getArrivalPredictionByLine(lineCode: number) {
    const res = await http.get(`/Previsao/Linha?codigoLinha=${lineCode}`);

    return VehicleLineETAModel.parse(res);
  },

  async getArrivalPredictionByStop(stopCode: number) {
    const res = await http.get(`/Previsao/Parada?codigoParada=${stopCode}`);
    return LinesStopETAModel.parse(res);
  },
};
