import { firestore } from "../../utils/firebase";
import { TrainStatusSchema, TrainStatus } from "../../domain/entities/current-train-status.model";
import { TrainStatusRepository } from "../../domain/repositories/TrainStatusRepository";
import { parseOrThrow } from "../../utils/parse-or-null";

export class TrainStatusFirestoreRepository implements TrainStatusRepository {
  private readonly collection = firestore.collection("current_train_status");

  async getAll(): Promise<TrainStatus[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc =>
      parseOrThrow(
        TrainStatusSchema,
        doc.data(),
        `Dados inválidos ao buscar status de trem (getAll) para doc ${doc.id}`
      )
    );
  }

  async getStatusByLine(line: string): Promise<TrainStatus | null> {
    const snapshot = await this.collection.get();
    for (const doc of snapshot.docs) {
      const status = parseOrThrow(
        TrainStatusSchema,
        doc.data(),
        `Dados inválidos ao buscar status de trem (getStatusByLine) para doc ${doc.id}`
      );
      if (status.line === line) {
        return status;
      }
    }
    return null;
  }

  async getById(id: string): Promise<TrainStatus | null> {
    const docSnap = await this.collection.doc(id).get();
    if (!docSnap.exists) return null;
    return parseOrThrow(
      TrainStatusSchema,
      docSnap.data(),
      `Dados inválidos ao buscar status de trem (getById) para id ${id}`
    );
  }
}
