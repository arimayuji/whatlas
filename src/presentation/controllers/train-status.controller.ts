import { FastifyRequest, FastifyReply } from "fastify";
import { TrainStatusRepository } from "../../domain/repositories/TrainStatusRepository";
import { responseSuccess } from "../../utils/responseSuccess";

export class TrainStatusController {
  constructor(private readonly trainStatusRepository: TrainStatusRepository) {}

  async findAll(_: FastifyRequest, reply: FastifyReply) {
      const data = await this.trainStatusRepository.getAll();
      return responseSuccess(reply, data, "Founded all lines", 200);
  }

  async findById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
      const { id } = request.params;
      const data = await this.trainStatusRepository.getById(id);

      if (!data) {
        return reply.code(404).send({ message: "Linha não encontrada" });
      }

      return responseSuccess(reply, data, "Founded line", 200);
  }
}
