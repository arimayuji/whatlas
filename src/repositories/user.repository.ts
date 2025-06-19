import { User } from "../models/user.model";
import { firestore } from "../utils/firebase";

const collection = firestore.collection("users");

export const userRepository = {
  async findById(id: string): Promise<User | null> {
    const doc = await collection.doc(id).get();
    return doc.exists ? (doc.data() as User) : null;
  },

  async findByPhone(phone: string): Promise<User | null> {
    const snapshot = await collection
      .where("phone", "==", phone)
      .limit(1)
      .get();
    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as User;
  },

  async create(user: User): Promise<void> {
    await collection.doc(user.id).set(user);
  },

  async update(id: string, data: Partial<User>): Promise<void> {
    await collection.doc(id).update(data);
  },

  async delete(id: string): Promise<void> {
    await collection.doc(id).delete();
  },

  async findAll(): Promise<User[]> {
    const snapshot = await collection.get();
    return snapshot.docs.map((doc) => doc.data() as User);
  },
};
