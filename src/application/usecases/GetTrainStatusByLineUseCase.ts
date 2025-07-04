import { LineNotExistsError } from "../../domain/errors/LineNotExists";
import { TrainStatusRepository } from "../../domain/repositories/TrainStatusRepository";

interface getTrainStatusByLineDTO {
  line: string;
}

export class GetTrainStatusByLine {
  constructor(private trainStatusRepository: TrainStatusRepository) {}
  async execute({ line }: getTrainStatusByLineDTO) {
    const result = this.trainStatusRepository.getStatusByLine(line);

    if(!result) {
      throw new LineNotExistsError(`Linha ${line} nao encontrada`)
    }

    return result
  }
}