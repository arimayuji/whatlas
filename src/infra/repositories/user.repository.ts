import { firestore } from "../../utils/firebase";
import { AppError } from "../../domain/errors/app-error";
import { User } from "../../domain/entities/user.model";
import { UserRepository } from "../../domain/repositories/UserRepository";


export class UserRepositoryFirestore implements UserRepository {
  private readonly collection = firestore.collection("users");

  async findAll(): Promise<User[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data() as User);
  }

  async findById(id: string): Promise<User> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new AppError("User not found", 404);
    return doc.data() as User;
  }

  async findByPhone(phone: string): Promise<User | null> {
    const doc = await this.collection.where("phone", "==", phone).limit(1).get();
    if (doc.empty) throw new AppError("User not found", 404);
    return doc.docs[0].data() as User;
  }

  async create(user: User): Promise<void> {
    const existing = await this.findByPhone(user.phone);
    if (existing) throw new AppError("Phone already registered", 409);
    await this.collection.doc(user.id).set(user);
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new AppError("User not found", 404);
    await this.collection.doc(id).update(data);
  }

  async delete(id: string): Promise<void> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new AppError("User not found", 404);
    await this.collection.doc(id).delete();
  }
}
