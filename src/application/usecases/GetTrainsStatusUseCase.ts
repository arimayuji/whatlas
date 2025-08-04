import { logger } from "firebase-functions";
import { StatusModel } from "../../domain/entities/direto-dos-trens/status.model";
import { DiretoTrensGateway } from "../gateways/DiretoTrensGateway";

export class GetTrainStatusUseCase {
  constructor(private readonly diretoTrnsGateway: DiretoTrensGateway) { }
  
  async exec(): Promise<StatusModel[]> {
    const result = await this.diretoTrnsGateway.getLinesLastStatus();

    if (!Array.isArray(result)) {
      logger.error("Invalid response format for train status");
      throw new Error("Invalid response format for train status");
    }

    logger.info(`Fetched ${result.length} train statuses`);
    
    return result;
  }
}