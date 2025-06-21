import { sptransRepository } from "../repositories/sptrans.repository";
import { SptransCompanyResponseModel } from "../models/sptrans-company.model";
import { SpTransCorredorResponseModel } from "../models/sptrans-corredor.model";
import { VehicleLineETAModel } from "../models/sptrans-eta-line.model";
import { LinesStopETAModel } from "../models/sptrans-eta-stop.model";
import { LineStopETAModel } from "../models/sptrans-eta-stopline.model";
import { SpTransLinesModel } from "../models/sptrans-line.model";
import { LinePositionResponseModel } from "../models/sptrans-position.model";
import { SpTransStopResponseModel } from "../models/sptrans-stop.model";
import { LineVehiclesPositionsModel } from "../models/sptrans-vehicle.model";

export const sptransService = {
  async getCompanies() {
    const res = await sptransRepository.getCompanies();
    return SptransCompanyResponseModel.parse(res);
  },

  async getCorredores() {
    const res = await sptransRepository.getCorredores();
    return SpTransCorredorResponseModel.parse(res);
  },

  async searchLines(term: string) {
    const res = await sptransRepository.searchLines(term);
    return SpTransLinesModel.parse(res);
  },

  async searchLineWithDirection(term: string, direction: 1 | 2) {
    const res = await sptransRepository.searchLineWithDirection(
      term,
      direction
    );
    return SpTransLinesModel.parse(res);
  },

  async getStopsByTerm(term: string) {
    const res = await sptransRepository.getStopsByTerm(term);
    return SpTransStopResponseModel.parse(res);
  },

  async getStopsByLine(lineCode: number) {
    const res = await sptransRepository.getStopsByLine(lineCode);
    return SpTransStopResponseModel.parse(res);
  },

  async getStopsByCorredor(corredorCode: number) {
    const res = await sptransRepository.getStopsByCorredor(corredorCode);
    return SpTransStopResponseModel.parse(res);
  },

  async getVehiclePositions() {
    const res = await sptransRepository.getVehiclePositions();
    return LinePositionResponseModel.parse(res);
  },

  async getVehiclePositionsByLine(lineCode: number) {
    const res = await sptransRepository.getVehiclePositionsByLine(lineCode);
    return LineVehiclesPositionsModel.parse(res);
  },

  async getArrivalPrediction(stopCode: number, lineCode: number) {
    const res = await sptransRepository.getArrivalPrediction(
      stopCode,
      lineCode
    );
    return LineStopETAModel.parse(res);
  },

  async getArrivalPredictionByLine(lineCode: number) {
    const res = await sptransRepository.getArrivalPredictionByLine(lineCode);
    return VehicleLineETAModel.parse(res);
  },

  async getArrivalPredictionByStop(stopCode: number) {
    const res = await sptransRepository.getArrivalPredictionByStop(stopCode);
    return LinesStopETAModel.parse(res);
  },
};
