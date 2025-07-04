import { LineNotExistsError } from "../../domain/errors/LineNotExists";
import { TrainStatusRepository } from "../../domain/repositories/TrainStatusRepository";

interface getTrainStatusByIdDTO {
  id: string;
}

export class GetTrainStatusById {
  constructor(private trainStatusRepository: TrainStatusRepository) {}
  async execute({ id }: getTrainStatusByIdDTO) {
    const result = this.trainStatusRepository.getById(id);

    if(!result) {
      throw new LineNotExistsError(`Linha ${id} nao encontrada`)
    }

    return result
  }
}