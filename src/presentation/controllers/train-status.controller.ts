import { FastifyRequest, FastifyReply } from "fastify";
import { TrainStatusRepository } from "../../domain/repositories/TrainStatusRepository";
import { handleError } from "../../utils/handle-error";

export class TrainStatusController {
  constructor(private readonly trainStatusRepository: TrainStatusRepository) {}

  async findAll(_: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await this.trainStatusRepository.getAll();
      return reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async findById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const data = await this.trainStatusRepository.getById(id);

      if (!data) {
        return reply.code(404).send({ message: "Linha não encontrada" });
      }

      return reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }
}
