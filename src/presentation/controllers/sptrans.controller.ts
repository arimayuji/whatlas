import { FastifyRequest, FastifyReply } from "fastify";
import { responseSuccess } from "../../utils/responseSuccess";
import { GetArrivalPredicitonsByLineUseCase } from "../../application/usecases/GetArrivalPredictionsByLineUseCase";
import { GetArrivalPredicitonsUseCase } from "../../application/usecases/GetArrivalPredictionUseCase";
import { GetArrivalPredicitonsByStopUseCase } from "../../application/usecases/GetArrivalPredictionsByStopUseCase";
import { GetCompaniesUseCase } from "../../application/usecases/GetCompaniesUseCase";
import { GetCorradoresUseCase } from "../../application/usecases/GetCorredoresUseCase";
import { GetSearchLineUseCase } from "../../application/usecases/GetSearchLinesUseCase";
import { GetSearchLineWithDirectionUseCase } from "../../application/usecases/GetSearchLinesWithDirectionUseCase";
import { GetStopsByCorredorUseCase } from "../../application/usecases/GetStopsByCorredorUseCase";
import { GetStopsByLineeUseCase } from "../../application/usecases/GetStopsByLineUseCase";
import { GetStopsByTermeUseCase } from "../../application/usecases/GetStopsByTermUseCase";
import { GetVehiclePositionsByLineUseCase } from "../../application/usecases/GetVehiclePositionsByLineUseCase";
import { GetVehiclePositionsUseCase } from "../../application/usecases/GetVehiclePositionsUseCase";

export class SpTransController {
  constructor(private readonly getArrivalPredictionsByStopUseCase: GetArrivalPredicitonsByStopUseCase,
    private readonly getArrivalPredictionsByLineUseCase: GetArrivalPredicitonsByLineUseCase,
    private readonly getArrivalPredictionsUseCase: GetArrivalPredicitonsUseCase, 
    private readonly getCompaniesUseCase: GetCompaniesUseCase,
    private readonly getCorredoresUseCase: GetCorradoresUseCase,
    private readonly getSearchLineUseCase: GetSearchLineUseCase,
    private readonly getSearchLineWithDirectionUseCase: GetSearchLineWithDirectionUseCase,
    private readonly getStopsByCorredorUseCase: GetStopsByCorredorUseCase,
    private readonly getStopsByLineUseCase: GetStopsByLineeUseCase,
    private readonly getStopsByTermUseCase: GetStopsByTermeUseCase,
    private readonly getVehiclePositionsByLineUseCase: GetVehiclePositionsByLineUseCase,
    private readonly getVehiclePositionsUseCase: GetVehiclePositionsUseCase,
  ) {}

  async getCompanies(req: FastifyRequest, reply: FastifyReply) {
    const data = await this.getCompaniesUseCase.execute();

    return responseSuccess(reply, {data, message: "Founded companies", code: 200});
  }

  async getCorredores(req: FastifyRequest, reply: FastifyReply) {
    const data = await this.getCorredoresUseCase.execute();
    
    if (!data || data.length === 0)
      return reply.code(404).send({ message: "No corridors found" });

    return responseSuccess(reply,{ data, message: "Founded corridors", code: 200});
  }

  async searchLines(
    req: FastifyRequest<{ Querystring: { termosBusca: string } }>,
    reply: FastifyReply
  ) {
    const data = await this.getSearchLineUseCase.execute({
        term: req.query.termosBusca,
      });
    
    if (!data || data.length === 0)
      return reply.code(404).send({ message: "No lines found" });
    
    return responseSuccess(reply,{ data, message: "Founded lines", code: 200});
  }

  async searchLineWithDirection(
    req: FastifyRequest<{
      Querystring: { termosBusca: string; sentido: 1 | 2 };
    }>,
    reply: FastifyReply
  ) {
    const data = await this.getSearchLineWithDirectionUseCase.execute({
      direction: req.query.sentido,
      term: req.query.termosBusca
    })

    if (!data || data.length === 0)
        return reply
          .code(404)
          .send({ message: "No lines found for given direction" });
    
    return responseSuccess(reply, {data, message: "Founded lines", code: 200});
  }

  async getStopsByTerm(
    req: FastifyRequest<{ Querystring: { termosBusca: string } }>,
    reply: FastifyReply
  ) {
    const data = await this.getStopsByTermUseCase.execute({
        term: req.query.termosBusca,
      });
    
    if (!data || data.length === 0)
      return reply.code(404).send({ message: "No stops found" });
    
    return responseSuccess(reply,{data, message: "Founded stops", code: 200});
  }

  async getStopsByLine(
    req: FastifyRequest<{ Params: { codigoLinha: number } }>,
    reply: FastifyReply
  ) {
    const data = await this.getStopsByLineUseCase.execute({
      lineCode: req.params.codigoLinha
    });
    
    if (!data || data.length === 0)
        return reply
          .code(404)
          .send({ message: "No stops found for this line" });
    
    return responseSuccess(reply,{data, message:"Founded stops by line", code: 200});
  }

  async getStopsByCorredor(
    req: FastifyRequest<{ Params: { codigoCorredor: number } }>,
    reply: FastifyReply
  ) {
    const data = await this.getStopsByCorredorUseCase.execute({
      corredorCode: req.params.codigoCorredor
    })

    if (!data || data.length === 0)
        return reply
          .code(404)
          .send({ message: "No stops found for this corridor" });
    
    return responseSuccess(reply, {data,message: "Founded stops by corridor", code: 200});
  }

  async getVehiclePositions(req: FastifyRequest, reply: FastifyReply) {
    const data = await this.getVehiclePositionsUseCase.execute();

    if (!data || !data.l || data.l.length === 0)
        return reply.code(404).send({ message: "No vehicle positions found" });
    
    return responseSuccess(reply, {data,message: "Founded vehicle positions", code: 200});
  }

  async getVehiclePositionsByLine(
    req: FastifyRequest<{ Params: { codigoLinha: number } }>,
    reply: FastifyReply
  ) {
    const data = await this.getVehiclePositionsByLineUseCase.execute({
      lineCode: req.params.codigoLinha
    })
    
    if (!data || !data.vs || data.vs.length === 0)
        return reply
          .code(404)
          .send({ message: "No vehicle positions for this line" });
    
    return responseSuccess(reply, {data,message: "Founded vehicle positions by line", code: 200});
  }

  async getArrivalPrediction(
    req: FastifyRequest<{ Params: { stopCode: number; lineCode: number } }>,
    reply: FastifyReply
  ) {
    const data = await this.getArrivalPredictionsUseCase.execute({
      stopCode: req.params.stopCode,
      lineCode: req.params.lineCode
    })
    
    if (!data || !data.p || data.p.l.length === 0)
        return reply.code(404).send({ message: "No arrival prediction found" });
    
    return responseSuccess(reply, {data,message: "Arrival prediction", code: 200});
  }

  async getArrivalPredictionsByStop(
    req: FastifyRequest<{ Params: { stopCode: number } }>,
    reply: FastifyReply
  ) {
    const data = await this.getArrivalPredictionsByStopUseCase.execute({
      stopCode: req.params.stopCode
    })
    
    if (!data || !data.p || data.p.l.length === 0)
        return reply.code(404).send({ message: "No arrival predictions found" });
    
    return responseSuccess(reply, {data,message: "Arrival predictions by stop", code: 200});
  }

  async getArrivalPredictionsByLine(
    req: FastifyRequest<{ Params: { lineCode: number } }>,
    reply: FastifyReply
  ) {
    const data = await this.getArrivalPredictionsByLineUseCase.execute({
      lineCode: req.params.lineCode
    })
    
    if (!data || !data.ps || data.ps.length === 0)
      return reply.code(404).send({ message: "No arrival predictions found" });
    
    return responseSuccess(reply,{data,message: "Arrival predictions by line", code: 200});
  }
}
