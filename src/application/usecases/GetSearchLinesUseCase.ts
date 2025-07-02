
import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetSearchLineDTO {
  term: string
 }

export class GetSearchLineUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({term}: GetSearchLineDTO) {
    return this.spTransApi.searchLines(term);
  }
}
