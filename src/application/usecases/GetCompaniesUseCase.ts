import { logger } from "../../infra/logger";
import { SpTransGateway } from "../gateways/SpTransGateway";

export class GetCompaniesUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute() {
    const companies = await this.spTransApi.getCompanies();

    logger.info(`[Companies] Companies fetched successfully`, {
      companies
    })
    
    return companies;
  }
}
