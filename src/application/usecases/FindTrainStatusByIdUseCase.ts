import { LineNotExistsError } from "../../domain/errors/LineNotExists"
import { TrainStatusRepository } from "../../domain/repositories/TrainStatusRepository"

interface FindTrainStatusByIdDTO{
  id: string
}

export class FindTrainStatusByIdUseCase {
  constructor(private readonly trainStatusRepository: TrainStatusRepository) {}
  
  async execute({ id }: FindTrainStatusByIdDTO) {
    const result = this.trainStatusRepository.getById(id)

    if(!result) {
      throw new LineNotExistsError(`Linha ${id} nao encontrada`)
    }

    return result
  }
}