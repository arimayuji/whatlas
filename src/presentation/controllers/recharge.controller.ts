import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteRechargeUseCase } from "../../application/usecases/DeleteRechargeUseCase";
import { GetRechargeHistoryUseCase } from "../../application/usecases/GetRechargeHistoryUseCase";
import { RechargeCardUseCase } from "../../application/usecases/RechargeCardUseCase";
import { responseSuccess } from "../../utils/responseSuccess";

export class RechargeController{
  constructor(private readonly deleteRechargeUseCase: DeleteRechargeUseCase,
    private readonly rechargeCardUseCase: RechargeCardUseCase,
    private readonly getRechargeHistoryUseCase: GetRechargeHistoryUseCase
  ) { }
  
  async deleteRecharge(req: FastifyRequest<{Params : {userId: string, rechargeId: string}}>, res : FastifyReply) {
    const { userId, rechargeId } = req.params;

    const result = await this.deleteRechargeUseCase.execute({ userId, rechargeId });
    return responseSuccess(res, result, "Recharge deleted with success", 200);
  }

  async rechargeCard(req: FastifyRequest<{Params : {userId: string}, Body : {recharge: number}}>, res : FastifyReply) {
    const { userId } = req.params;

    const result = await this.rechargeCardUseCase.execute({ userId,amount: req.body.recharge });
    return responseSuccess(res, result, "Recharge added with success", 200);
  }

  async getRechargeHistory(req: FastifyRequest<{Params : {userId: string}}>, res : FastifyReply) {
    const { userId } = req.params;  

    const result = await this.getRechargeHistoryUseCase.execute({ userId });
    return responseSuccess(res, result, "Recharges found with success", 200);
  }
}