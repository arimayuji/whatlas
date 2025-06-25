import {
  TrainStatus,
  TrainStatusSchema,
} from "../../domain/entities/current-train-status.model";
import { TrainStatusRepository } from "../../domain/repositories/TrainStatusRepository";
import { firestore } from "../../utils/firebase";

export class TrainStatusFirestoreRepository implements TrainStatusRepository {
  private readonly collection = firestore.collection("current_train_status");

  async getAll(): Promise<TrainStatus[]> {
    const snapshot = await this.collection.get();

    const data = snapshot.docs.map((doc) => {
      const parsed = TrainStatusSchema.safeParse(doc.data());
      return parsed.success ? parsed.data : null;
    });

    return data.filter((item): item is TrainStatus => item !== null);
  }

  async getById(id: string): Promise<TrainStatus | null> {
    const doc = await this.collection.doc(id).get();

    if (!doc.exists) return null;

    const parsed = TrainStatusSchema.safeParse(doc.data());

    return parsed.success ? parsed.data : null;
  }
}
