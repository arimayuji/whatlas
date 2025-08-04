import axios, { AxiosInstance } from "axios";
import { DiretoTrensGateway } from "../../application/gateways/DiretoTrensGateway";
import { StatusModel, StatusSchema } from "../../domain/entities/direto-dos-trens/status.model";
import { logger } from "../logger";

export class HttpDiretoTrensGateway implements DiretoTrensGateway{
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = axios.create({
      baseURL: 'https://www.diretodostrens.com.br/api',
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  async getLinesLastStatus(): Promise<StatusModel[]> {
    const { data, status, statusText} = await this.client.get<StatusModel[]>('/status');

    if (status !== 200) {
      logger.error(`Failed to fetch lines last status: ${statusText}`);
      throw new Error(`Failed to fetch lines last status: ${statusText}`);
    }

    const parsedData = data.map(item => StatusSchema.parse(item));

    if (!Array.isArray(parsedData)) {
      logger.error("Invalid response format for lines last status");
      throw new Error("Invalid response format for lines last status");
    }

    logger.info(`Fetched ${parsedData.length} lines last status`);

    return parsedData;
  }

   async getLastIdsByLine(lineCode: number): Promise<{ id: number; }[]> {
     const { data, status, statusText } = await this.client.get<{ id: number; }[]>(`/status/codigo/${lineCode}`);
     
     if (status !== 200) {
       logger.error(`Failed to fetch last IDs by line: ${statusText}`);
       throw new Error(`Failed to fetch last IDs by line: ${statusText}`);
     }

     const parsedData = data.map(item => ({ id: item.id }));

     if (!Array.isArray(parsedData)) {
        logger.error("Invalid response format for last IDs by line");
       throw new Error("Invalid response format for last IDs by line");
     }

     logger.info(`Fetched ${parsedData.length} last IDs for line ${lineCode}`);

     return parsedData;
  }

  async getLastYearLineIds(year: number, lineCode: number): Promise<{ id: number; }[]> {
    const { data, status, statusText } = await this.client.get<{ id: number; }[]>(`/status}/codigo/${lineCode}/${year}`);
    
    if (status !== 200) {
      logger.error(`Failed to fetch last year line IDs: ${statusText}`);
      throw new Error(`Failed to fetch last year line IDs: ${statusText}`);
    }

    const parsedData = data.map(item => ({ id: item.id }));

    if (!Array.isArray(parsedData)) {
      logger.error("Invalid response format for last year line IDs");
      throw new Error("Invalid response format for last year line IDs");
    }

    logger.info(`Fetched ${parsedData.length} last year line IDs for line ${lineCode} in year ${year}`);

    return parsedData;
  }

  async getStatusById(id: number): Promise<StatusModel> {
   const { data, status, statusText } = await this.client.get<StatusModel>(`/status/id/${id}`);

    if (status !== 200) {
      logger.error(`Failed to fetch status by ID: ${statusText}`);
      throw new Error(`Failed to fetch status by ID: ${statusText}`);
    }

    const parsedData = StatusSchema.parse(data);

    if (!parsedData) {
      logger.error("Invalid response format for status by ID");
      throw new Error("Invalid response format for status by ID");
    }

    logger.info(`Fetched status by ID: ${id}`);

    return parsedData;
  }
}