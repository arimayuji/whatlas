import { firestore } from "../../utils/firebase";
import { AppError } from "../../domain/errors/app-error";
import { User } from "../../domain/entities/user.model";
import { UserRepository } from "../../domain/repositories/UserRepository";

const collection = firestore.collection("users");

export class UserRepositoryFirestore implements UserRepository {
  async findAll(): Promise<User[]> {
    const snapshot = await collection.get();
    return snapshot.docs.map((doc) => doc.data() as User);
  }

  async findById(id: string): Promise<User> {
    const doc = await collection.doc(id).get();
    if (!doc.exists) throw new AppError("User not found", 404);
    return doc.data() as User;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const doc = await collection.where("phone", "==", phone).limit(1).get();
    if (doc.empty) throw new AppError("User not found", 404);
    return doc.docs[0].data() as User;
  }

  async create(user: User): Promise<void> {
    const existing = await this.findByPhone(user.phone);
    if (existing) throw new AppError("Phone already registered", 409);
    await collection.doc(user.id).set(user);
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    const doc = await collection.doc(id).get();
    if (!doc.exists) throw new AppError("User not found", 404);
    await collection.doc(id).update(data);
  }

  async delete(id: string): Promise<void> {
    const doc = await collection.doc(id).get();
    if (!doc.exists) throw new AppError("User not found", 404);
    await collection.doc(id).delete();
  }
}
