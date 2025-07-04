import { DeleteRechargeUseCase } from "../../application/usecases/DeleteRechargeUseCase";
import { GetRechargeHistoryUseCase } from "../../application/usecases/GetRechargeHistoryUseCase";
import { RechargeCardUseCase } from "../../application/usecases/RechargeCardUseCase";
import { RechargeController } from "../../presentation/controllers/recharge.controller";
import { repositories } from "../repositories";

export function rechargeController() {
  const deleteRechargUseCase = new DeleteRechargeUseCase(repositories.rechargeRepository, repositories.userRepository)
  const rechargeCardUseCase = new RechargeCardUseCase(repositories.balanceRepository)
  const getRechargeHistoryUseCase = new GetRechargeHistoryUseCase(repositories.rechargeRepository, repositories.userRepository)
  
  return new RechargeController(  
    deleteRechargUseCase,
    rechargeCardUseCase,
    getRechargeHistoryUseCase
  )
}