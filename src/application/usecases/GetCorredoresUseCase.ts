import { SpTransGateway } from "../gateways/SpTransGateway";

export class GetCorradoresUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute() {
    return this.spTransApi.getCorredores();
  }
}
