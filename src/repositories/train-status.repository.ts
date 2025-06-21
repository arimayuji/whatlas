import {
  TrainStatus,
  TrainStatusSchema,
} from "../models/current-train-status.model";
import { firestore } from "../utils/firebase";

const collection = firestore.collection("current_train_status");

export const trainStatusRepository = {
  async getAll(): Promise<TrainStatus[]> {
    const snapshot = await collection.get();

    const data = snapshot.docs.map((doc) => {
      const parsed = TrainStatusSchema.safeParse(doc.data());

      if (parsed.success) return parsed.data;

      return null;
    });

    return data.filter((item) => item !== null) as TrainStatus[];
  },

  async getById(id: string): Promise<TrainStatus | null> {
    const doc = await collection.doc(id).get();

    if (!doc.exists) return null;

    const parsed = TrainStatusSchema.safeParse(doc.data());

    if (parsed.success) return parsed.data;

    return null;
  },
};
