import { SpTransGateway } from "../gateways/SpTransGateway";

export class GetCompaniesUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute() {
    return this.spTransApi.getCompanies();
  }
}
