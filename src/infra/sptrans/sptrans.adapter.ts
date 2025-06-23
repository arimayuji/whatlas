// import { SptransCompanyResponseModel } from "../../domain/entities/sptrans-company.model";
// import { SpTransCorredorResponseModel } from "../../domain/entities/sptrans-corredor.model";
// import { VehicleLineETAModel } from "../../domain/entities/sptrans-eta-line.model";
// import { LinesStopETAModel } from "../../domain/entities/sptrans-eta-stop.model";
// import { LineStopETAModel } from "../../domain/entities/sptrans-eta-stopline.model";
// import { SpTransLinesModel } from "../../domain/entities/sptrans-line.model";
// import { LinePositionResponseModel } from "../../domain/entities/sptrans-position.model";
// import { SpTransStopResponseModel } from "../../domain/entities/sptrans-stop.model";
// import { LineVehiclesPositionsModel } from "../../domain/entities/sptrans-vehicle.model";
// import { SpTransClient } from "./sptrans.client";

// export const sptransService = {
//   async getCompanies() {
//     const res = await SpTransClient.getCompanies();
//     return SptransCompanyResponseModel.parse(res);
//   },

//   async getCorredores() {
//     const res = await SpTransClient.getCorredores();
//     return SpTransCorredorResponseModel.parse(res);
//   },

//   async searchLines(term: string) {
//     const res = await SpTransClient.searchLines(term);
//     return SpTransLinesModel.parse(res);
//   },

//   async searchLineWithDirection(term: string, direction: 1 | 2) {
//     const res = await SpTransClient.searchLineWithDirection(term, direction);
//     return SpTransLinesModel.parse(res);
//   },

//   async getStopsByTerm(term: string) {
//     const res = await SpTransClient.getStopsByTerm(term);
//     return SpTransStopResponseModel.parse(res);
//   },

//   async getStopsByLine(lineCode: number) {
//     const res = await SpTransClient.getStopsByLine(lineCode);
//     return SpTransStopResponseModel.parse(res);
//   },

//   async getStopsByCorredor(corredorCode: number) {
//     const res = await SpTransClient.getStopsByCorredor(corredorCode);
//     return SpTransStopResponseModel.parse(res);
//   },

//   async getVehiclePositions() {
//     const res = await SpTransClient.getVehiclePositions();
//     return LinePositionResponseModel.parse(res);
//   },

//   async getVehiclePositionsByLine(lineCode: number) {
//     const res = await SpTransClient.getVehiclePositionsByLine(lineCode);
//     return LineVehiclesPositionsModel.parse(res);
//   },

//   async getArrivalPrediction(stopCode: number, lineCode: number) {
//     const res = await SpTransClient.getArrivalPrediction(stopCode, lineCode);
//     return LineStopETAModel.parse(res);
//   },

//   async getArrivalPredictionByLine(lineCode: number) {
//     const res = await SpTransClient.getArrivalPredictionByLine(lineCode);
//     return VehicleLineETAModel.parse(res);
//   },

//   async getArrivalPredictionByStop(stopCode: number) {
//     const res = await SpTransClient.getArrivalPredictionByStop(stopCode);
//     return LinesStopETAModel.parse(res);
//   },
// };
