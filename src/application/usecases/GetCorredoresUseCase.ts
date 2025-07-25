import { logger } from "../../infra/logger";
import { SpTransGateway } from "../gateways/SpTransGateway";

export class GetCorradoresUseCase {
  constructor(private readonly spTransApi: SpTransGateway) {}

  async execute() {
    const corredores = await this.spTransApi.getCorredores();

    logger.info(`[Corredores] Corredores fetched successfully`, {
      corredores
    })

    return corredores
  }
}
