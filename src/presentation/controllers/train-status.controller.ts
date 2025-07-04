import { FastifyRequest, FastifyReply } from "fastify";
import { responseSuccess } from "../../utils/responseSuccess";
import { GetTrainStatusById } from "../../application/usecases/GetTrainStatusByIdUseCase";
import { GetTrainStatusByLine } from "../../application/usecases/GetTrainStatusByLineUseCase";
import { FindAllTrainStatusByIdUseCase } from "../../application/usecases/FindAllTrainStatusUseCase";

export class TrainStatusController {
  constructor(private readonly getTrainStatusByIdUseCase: GetTrainStatusById, private readonly getTrainStatusByLineUseCase: GetTrainStatusByLine,
      private readonly getAllTrainStatusUseCase: FindAllTrainStatusByIdUseCase,
  ) {}

  async findAll(_: FastifyRequest, reply: FastifyReply) {
    const data = await this.getAllTrainStatusUseCase.execute();
    
    return responseSuccess(reply, {data, message: "Founded all lines", code: 200});
  }

  async findById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    
    const data = await this.getTrainStatusByIdUseCase.execute({ id });

    if (!data) {
        return reply.code(404).send({ message: "Linha não encontrada" });
      }

    return responseSuccess(reply, {data, message: "Founded line", code: 200});
  }

  async getByLine(
    request: FastifyRequest<{ Params: { line: string } }>,
    reply: FastifyReply
  ) {
    const { line } = request.params;

    const data = await this.getTrainStatusByLineUseCase.execute({ line });      
    
    return responseSuccess(reply, {data, message: "Founded line", code: 200});
  }
}
