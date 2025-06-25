import { FastifyRequest, FastifyReply } from "fastify";
import { SpTransGateway } from "../../application/gateways/SpTransGateway";
import { handleError } from "../../utils/handle-error";

export class SpTransController {
  constructor(private readonly spTransGateway: SpTransGateway) {}

  async getCompanies(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await this.spTransGateway.getCompanies();
      if (!data || data.e.length === 0)
        return reply.code(404).send({ message: "No companies found" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async getCorredores(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await this.spTransGateway.getCorredores();
      if (!data || data.length === 0)
        return reply.code(404).send({ message: "No corridors found" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async searchLines(
    req: FastifyRequest<{ Querystring: { termosBusca: string } }>,
    reply: FastifyReply
  ) {
    try {
      const data = await this.spTransGateway.searchLines(req.query.termosBusca);
      if (!data || data.length === 0)
        return reply.code(404).send({ message: "No lines found" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async searchLineWithDirection(
    req: FastifyRequest<{
      Querystring: { termosBusca: string; sentido: 1 | 2 };
    }>,
    reply: FastifyReply
  ) {
    try {
      const data = await this.spTransGateway.searchLineWithDirection(
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
  }

  async getStopsByTerm(
    req: FastifyRequest<{ Querystring: { termosBusca: string } }>,
    reply: FastifyReply
  ) {
    try {
      const data = await this.spTransGateway.getStopsByTerm(
        req.query.termosBusca
      );
      if (!data || data.length === 0)
        return reply.code(404).send({ message: "No stops found" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async getStopsByLine(
    req: FastifyRequest<{ Params: { codigoLinha: number } }>,
    reply: FastifyReply
  ) {
    try {
      const data = await this.spTransGateway.getStopsByLine(
        req.params.codigoLinha
      );
      if (!data || data.length === 0)
        return reply
          .code(404)
          .send({ message: "No stops found for this line" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async getVehiclePositions(req: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await this.spTransGateway.getVehiclePositions();
      if (!data || !data.l || data.l.length === 0)
        return reply.code(404).send({ message: "No vehicle positions found" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async getVehiclePositionsByLine(
    req: FastifyRequest<{ Params: { codigoLinha: number } }>,
    reply: FastifyReply
  ) {
    try {
      const data = await this.spTransGateway.getVehiclePositionsByLine(
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
  }

  async getArrivalPrediction(
    req: FastifyRequest<{ Params: { stopCode: number; lineCode: number } }>,
    reply: FastifyReply
  ) {
    try {
      const data = await this.spTransGateway.getArrivalPrediction(
        req.params.stopCode,
        req.params.lineCode
      );
      if (!data || !data.p || data.p.l.length === 0)
        return reply.code(404).send({ message: "No arrival prediction found" });
      reply.send(data);
    } catch (error) {
      handleError(error, reply);
    }
  }
}
