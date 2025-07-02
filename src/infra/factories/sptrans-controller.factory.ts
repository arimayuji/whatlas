import { GetArrivalPredicitonsByLineUseCase } from "../../application/usecases/GetArrivalPredictionsByLineUseCase";
import { GetArrivalPredicitonsByStopUseCase } from "../../application/usecases/GetArrivalPredictionsByStopUseCase";
import { GetArrivalPredicitonsUseCase } from "../../application/usecases/GetArrivalPredictionUseCase";
import { GetCompaniesUseCase } from "../../application/usecases/GetCompaniesUseCase";
import { GetCorradoresUseCase } from "../../application/usecases/GetCorredoresUseCase";
import { GetSearchLineUseCase } from "../../application/usecases/GetSearchLinesUseCase";
import { GetSearchLineWithDirectionUseCase } from "../../application/usecases/GetSearchLinesWithDirectionUseCase";
import { GetStopsByCorredorUseCase } from "../../application/usecases/GetStopsByCorredorUseCase";
import { GetStopsByLineeUseCase } from "../../application/usecases/GetStopsByLineUseCase";
import { GetStopsByTermeUseCase } from "../../application/usecases/GetStopsByTermUseCase";
import { GetVehiclePositionsByLineUseCase } from "../../application/usecases/GetVehiclePositionsByLineUseCase";
import { GetVehiclePositionsUseCase } from "../../application/usecases/GetVehiclePositionsUseCase";
import { SpTransController } from "../../presentation/controllers/sptrans.controller";
import { SpTransHttpGateway } from "../gateways/sptrans.gateway";

export function makeSpTransController() {
  const userRepository = new SpTransHttpGateway()
  
  const  getArrivalPredictionsByStopUseCase= new GetArrivalPredicitonsByStopUseCase(userRepository)
  const  getArrivalPredictionsByLineUseCase= new GetArrivalPredicitonsByLineUseCase(userRepository)
  const  getArrivalPredictionsUseCase= new GetArrivalPredicitonsUseCase(userRepository)
  const  getCompaniesUseCase= new GetCompaniesUseCase(userRepository)
  const  getCorredoresUseCase= new GetCorradoresUseCase(userRepository)
  const  getSearchLineUseCase= new GetSearchLineUseCase(userRepository)
  const  getSearchLineWithDirectionUseCase= new GetSearchLineWithDirectionUseCase(userRepository)
  const  getStopsByCorredorUseCase= new GetStopsByCorredorUseCase(userRepository)
  const  getStopsByLineUseCase= new GetStopsByLineeUseCase(userRepository)
  const  getStopsByTermUseCase= new GetStopsByTermeUseCase(userRepository)
  const  getVehiclePositionsByLineUseCase= new GetVehiclePositionsByLineUseCase(userRepository)
  const getVehiclePositionsUseCase = new GetVehiclePositionsUseCase(userRepository)
  
  return new SpTransController(getArrivalPredictionsByStopUseCase,getArrivalPredictionsByLineUseCase,getArrivalPredictionsUseCase, getCompaniesUseCase,getCorredoresUseCase,getSearchLineUseCase,getSearchLineWithDirectionUseCase,getStopsByCorredorUseCase,getStopsByLineUseCase,getStopsByTermUseCase,getVehiclePositionsByLineUseCase,getVehiclePositionsUseCase)
  
}