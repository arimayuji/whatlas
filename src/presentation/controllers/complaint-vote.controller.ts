import { FastifyReply, FastifyRequest } from "fastify";
import { GetUserVoteUseCase } from "../../application/usecases/GetUserVoteUseCase";
import { RegisterUserVoteUseCase } from "../../application/usecases/RegisterUserVoteUseCase";
import { UserHasVotedUseCase } from "../../application/usecases/UserHasVotedUseCase";
import { responseSuccess } from "../../utils/responseSuccess";

export class ComplaintVoteController {
  constructor(
    private readonly getUserVoteUseCase: GetUserVoteUseCase,
    private readonly registerUserVoteUseCase: RegisterUserVoteUseCase,
    private readonly removeUserVoteUseCase: RegisterUserVoteUseCase,
    private readonly userHasVotedUseCase: UserHasVotedUseCase,
  ) { }
  
  async getUserVote(req: FastifyRequest<{ Body: { complaintId: string, userId: string } }>, res: FastifyReply) {
    const { complaintId, userId } = req.body;

    const result = await this.getUserVoteUseCase.exec({ complaintId, userId });

    return responseSuccess(res, { data: result, message: "User vote retrieved successfully", code: 200 });
   }

  async removeUserVote(req: FastifyRequest<{ Body: { complaintId: string, userId: string,voteType: 'up' | 'down' } }>, res: FastifyReply) {
    const { complaintId, userId, voteType } = req.body;
    
    const result = await this.removeUserVoteUseCase.exec({ complaintId, userId, voteType });
    
    return responseSuccess(res, { data: result, message: "User vote removed successfully", code: 200 });
   }

  async userHasVoted(req: FastifyRequest<{ Params: { complaintId: string, userId: string } }>, res: FastifyReply) {
    const { complaintId, userId } = req.params;

    const result = await this.userHasVotedUseCase.exec({ complaintId, userId });

    return responseSuccess(res, { data: result, message: "User vote status checked successfully", code: 200 });
  }
  
}