import { FastifyReply, FastifyRequest } from "fastify";
import { GetRemainingTicketsUseCase } from "../../application/usecases/GetRemainingTicketsUseCase";
import { GetUserCardUseCase } from "../../application/usecases/GetUserCardUseCase";
import { UpdateUserCardUseCase } from "../../application/usecases/UpdateUserCardUseCae";
import { responseSuccess } from "../../utils/responseSuccess";

export class UserCardBalanceController {
  constructor(
    private readonly updateUserCardUseCase: UpdateUserCardUseCase,
    private readonly getUserCardUseCase: GetUserCardUseCase,
    private readonly getRamainingTicketsUseCase: GetRemainingTicketsUseCase
  ) { }
  
  async updateUserCardBalance(req: FastifyRequest<{ Params: { userId: string }, Body: { currentBalance: number, updatedAt: string } }>, res: FastifyReply) {
    const { userId } = req.params;
    const { currentBalance, updatedAt } = req.body;

    await this.updateUserCardUseCase.execute({ userId, currentBalance, updatedAt })

    return responseSuccess(res, {data: null, message: "User card balance updated with success", code: 204});
  }

  async getUserCardBalance(req: FastifyRequest<{ Params: { userId: string } }>, res: FastifyReply) {
    const { userId } = req.params;
    const result = await this.getUserCardUseCase.execute({ userId })
    
    return responseSuccess(res, {data: result, message: "User card balance found with success", code: 200});
  }

  async getRemainingTickets(req: FastifyRequest<{ Params: { userId: string } }>, res: FastifyReply) {
    const { userId } = req.params;
    const result = await this.getRamainingTicketsUseCase.execute({ userId })

    return responseSuccess(res, {data: result, message: "Remaining tickets found with success", code: 200});
  }
}