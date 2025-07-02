
import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetSearchLineWithDirectionDTO {
  term: string
  direction: 1 | 2
 }

export class GetSearchLineWithDirectionUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({term, direction}: GetSearchLineWithDirectionDTO) {
    return this.spTransApi.searchLineWithDirection(term,direction);
  }
}
