import { FastifyReply, FastifyRequest } from 'fastify';
import { responseSuccess } from '../../utils/responseSuccess';
import { GetTerminalBusLinesUseCase } from '../../application/usecases/GetTerminalBusLinesUseCase';
import { GetBusLineStopsUseCase } from '../../application/usecases/GetBusLineStopsUseCase';
import { BusLineStopsQuery, busLineStopsSchema, TerminalBusLinesQuery, terminalBusLinesSchema } from '../@types/bus.type';

export class BusController {
  constructor(private readonly getTerminalBusLinesUseCase: GetTerminalBusLinesUseCase, private readonly getBusLineStopsUseCase: GetBusLineStopsUseCase) {}

  async handleGetBusLineStopsUseCase(req: FastifyRequest<{ Querystring:BusLineStopsQuery }>, res: FastifyReply) {
    const { busline} = busLineStopsSchema.parse(req.query);

    const result = await this.getBusLineStopsUseCase.execute({
        busline
      });

    return responseSuccess(res, {data: result, message: "Founded bus line stops", code: 200});
  }

  async handleGetTerminalBusLinesUseCase(req: FastifyRequest<{ Querystring: TerminalBusLinesQuery }>, res: FastifyReply) {
    const { terminal } = terminalBusLinesSchema.parse(req.query);

    const result = await this.getTerminalBusLinesUseCase.execute({
      terminal
    });

    return responseSuccess(res, {data: result, message: "Founded terminal bus lines", code: 200});
  }
}
