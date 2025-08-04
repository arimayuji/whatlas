import { LastStatusModel } from "../../domain/entities/direto-dos-trens/last-status.model";

export class LastStatusDTO {
  static fromApi(data: any): LastStatusModel {
    return {
      code: data.codigo,
      createdAt: data.criado,
      description: data.descricao|| undefined,
      id: data.id,
      updatedAt: data.modificado || undefined,
      situation: data.situacao,
    };
  }
}