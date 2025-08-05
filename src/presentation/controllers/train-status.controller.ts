import { FastifyRequest, FastifyReply } from "fastify";
import { responseSuccess } from "../../utils/responseSuccess";
import { GetTrainStatusUseCase } from "../../application/usecases/GetTrainsStatusUseCase";
import { TRAIN_LINE_NAME_CODE } from "../../utils/train-code";

export class TrainStatusController {
  constructor(private readonly getTrainStatusUseCase: GetTrainStatusUseCase
  ) { }

  async findTrainLastStatus(_: FastifyRequest, reply: FastifyReply) {
    const data = await this.getTrainStatusUseCase.exec();

    const dataWithLineName = data.map(lastStatus => {
      const lineName = Object.keys(TRAIN_LINE_NAME_CODE).find(key => Number(key) === lastStatus.code);

      return {...lastStatus,lineName }
    })
    
    return responseSuccess(reply, { data: dataWithLineName, message: "Founded all lines", code: 200 });
  }
}
