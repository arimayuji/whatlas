import { FastifyReply, FastifyRequest } from "fastify";
import { sptransService } from "../domain/services/sptrans.service";
import { handleError } from "../utils/handle-error";

export const spTransController = {
  async getCompanies(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await sptransService.getCompanies();
      if (!data || data.e.length === 0)
        return reply.code(404).send({ message: "No companies found" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async getCorredores(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await sptransService.getCorredores();
      if (!data || data.length === 0)
        return reply.code(404).send({ message: "No corridors found" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async searchLines(
    req: FastifyRequest<{ Querystring: { termosBusca: string } }>,
    reply: FastifyReply
  ) {
    try {
      const data = await sptransService.searchLines(req.query.termosBusca);
      if (!data || data.length === 0)
        return reply.code(404).send({ message: "No lines found" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async searchLineWithDirection(
    req: FastifyRequest<{
      Querystring: { termosBusca: string; sentido: 1 | 2 };
    }>,
    reply: FastifyReply
  ) {
    try {
      const data = await sptransService.searchLineWithDirection(
        req.query.termosBusca,
        req.query.sentido
      );
      if (!data || data.length === 0)
        return reply
          .code(404)
          .send({ message: "No lines found for given direction" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async getStopsByTerm(
    req: FastifyRequest<{ Querystring: { termosBusca: string } }>,
    reply: FastifyReply
  ) {
    try {
      const data = await sptransService.getStopsByTerm(req.query.termosBusca);
      if (!data || data.length === 0)
        return reply.code(404).send({ message: "No stops found" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async getStopsByLine(
    req: FastifyRequest<{ Params: { codigoLinha: number } }>,
    reply: FastifyReply
  ) {
    try {
      const data = await sptransService.getStopsByLine(req.params.codigoLinha);
      if (!data || data.length === 0)
        return reply
          .code(404)
          .send({ message: "No stops found for this line" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async getVehiclePositions(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await sptransService.getVehiclePositions();
      if (!data || !data.l || data.l.length === 0)
        return reply.code(404).send({ message: "No vehicle positions found" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async getVehiclePositionsByLine(
    req: FastifyRequest<{ Params: { codigoLinha: number } }>,
    reply: FastifyReply
  ) {
    try {
      const data = await sptransService.getVehiclePositionsByLine(
        req.params.codigoLinha
      );
      if (!data || !data.vs || data.vs.length === 0)
        return reply
          .code(404)
          .send({ message: "No vehicle positions for this line" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async getArrivalPrediction(
    req: FastifyRequest<{ Params: { stopCode: number; lineCode: number } }>,
    reply: FastifyReply
  ) {
    try {
      const data = await sptransService.getArrivalPrediction(
        req.params.stopCode,
        req.params.lineCode
      );
      if (!data || !data.p || data.p.length === 0)
        return reply.code(404).send({ message: "No arrival prediction found" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  },
};
