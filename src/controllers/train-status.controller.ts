import { FastifyRequest, FastifyReply } from "fastify";
import { handleError } from "../utils/handle-error";
import { trainStatusRepository } from "../repositories/train-status.repository";

export const trainStatusController = {
  async findAll(_: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await trainStatusRepository.getAll();
      return reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async findById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const data = await trainStatusRepository.getById(id);

      if (!data) {
        return reply.code(404).send({ message: "Linha não encontrada" });
      }

      return reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },
};
