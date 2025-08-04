import { StatusModel } from "../../domain/entities/direto-dos-trens/status.model";

export class StatusDTO {
  static fromApi(data: any): StatusModel {
    return {
      id: data.id,
      code: data.codigo,
      createdAt: data.criado,
      description: data.descricao || undefined,
      situation: data.situacao,
    };
  }
}