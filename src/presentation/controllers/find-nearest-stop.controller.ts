import { z } from 'zod';
import { FindNearestStopUseCase } from '../../application/usecases/FindNearestStopUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { FindNearestQuery } from '../@types/find-nearest.type';
import { responseSuccess } from '../../utils/responseSuccess';

const findNearestSchema = z.object({
  tableName: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export class FindNearestStopController {
  constructor(private readonly useCase: FindNearestStopUseCase) {}

  async handle(req: FastifyRequest<{ Querystring: FindNearestQuery }>, res: FastifyReply) {
    try {
      const { tableName, latitude, longitude } = findNearestSchema.parse(req.query);

      const result = await this.useCase.execute({
        tableName: tableName as any, 
        latitude: latitude,
        longitude: longitude,
      });

      return responseSuccess(res, {data: result, message: "Founded nearest stop", code: 200});
    } catch (err: any) {
      console.error(err);
      return res.status(400).send(err.message);
    }
  }
}
