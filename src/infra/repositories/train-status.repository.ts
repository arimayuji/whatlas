import { firestore } from "../../utils/firebase";
import { TrainStatusRepository } from "../../domain/repositories/TrainStatusRepository";
import { parseOrThrow } from "../../utils/parse-or-null";
import { Disclaimer, TrainStatus, TrainStatusModel } from "../../domain/entities/train-status.model";

export class TrainStatusFirestoreRepository implements TrainStatusRepository {
  private readonly collection = firestore.collection("current_train_status");

  async getByName(name: string): Promise<TrainStatus | null> {
    const snapshot = await this.collection.get();

    for (const doc of snapshot.docs) {
      const status = parseOrThrow(
        TrainStatusModel,
        doc.data(),
        `Dados inválidos ao buscar status de trem (getByName) para doc ${doc.id}`
      );

      if (status.nome === name) {
        return status;
      }
    }

    return null;
  }

  async getDisclaimers(): Promise<Disclaimer[] | null> {
    const snapshot = await this.collection.get();
    let disclaimers: Disclaimer[] = [];

    for (const doc of snapshot.docs) {
      const trainLine = parseOrThrow(
        TrainStatusModel,
        doc.data(),
        `Dados inválidos ao buscar status de trem (getDisclaimers) para doc ${doc.id}`
      );

      if (trainLine.disclaimer) {
        disclaimers.push({ 
          nome: trainLine.nome,
          disclaimer: trainLine.disclaimer
        });
      }
    }

    return disclaimers ? disclaimers : null;
  }

  async getAll(): Promise<TrainStatus[]> {
    const snapshot = await this.collection.get();

    return snapshot.docs.map(doc =>
      parseOrThrow(
        TrainStatusModel,
        doc.data(),
        `Dados inválidos ao buscar status de trem (getAll) para doc ${doc.id}`
      )
    );
  }
}
