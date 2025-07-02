import { SpTransGateway } from "../gateways/SpTransGateway";

interface GetStopsByTermDTO {
  term: string;
}

export class GetStopsByTermeUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute({term}: GetStopsByTermDTO) {
    return this.spTransApi.getStopsByTerm(term);
  }
}
