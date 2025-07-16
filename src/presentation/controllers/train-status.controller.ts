import { FastifyRequest, FastifyReply } from "fastify";
import { responseSuccess } from "../../utils/responseSuccess";
import { GetTrainStatusUseCase } from "../../application/usecases/GetTrainStatusUseCase";
import { GetAllTrainStatusUseCase } from "../../application/usecases/GetAllTrainStatusUseCase";

export class TrainStatusController {
  constructor(private readonly getTrainStatusUseCase: GetTrainStatusUseCase,
      private readonly getAllTrainStatusUseCase: GetAllTrainStatusUseCase,
  ) {}

  async findAll(_: FastifyRequest, reply: FastifyReply) {
    const data = await this.getAllTrainStatusUseCase.execute();
    
    return responseSuccess(reply, {data, message: "Founded all lines", code: 200});
  }

  async findByName(
    request: FastifyRequest<{ Querystring: { name: string } }>,
    reply: FastifyReply
  ) {
    const { name } = request.query;
    
    const data = await this.getTrainStatusUseCase.execute({ name });

    if (!data) {
        return reply.code(404).send({ message: "Linha não encontrada" });
      }

    return responseSuccess(reply, {data, message: "Founded line", code: 200});
  }

}
