import { firestore } from "../../utils/firebase";
import { User } from "../../domain/entities/user.model";
import { UserRepository } from "../../domain/repositories/UserRepository";


export class UserRepositoryFirestore implements UserRepository {
  private readonly collection = firestore.collection("users");

  async findAll(): Promise<User[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data() as User);
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.collection.doc(id).get();

    if (!doc.exists) return null;

    return doc.data() as User;
  }

  async create(user: User): Promise<void> {
    await this.collection.doc(user.id).set(user);
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    const doc = await this.collection.doc(id).get();

    await this.collection.doc(id).update(data);
  }

  async delete(id: string): Promise<void> {
    const doc = await this.collection.doc(id).get();

    await this.collection.doc(id).delete();
  }
}
