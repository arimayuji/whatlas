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

  async create(user: User): Promise<User> {
    const { id, ...userWithoutId } = user;
    
    const snapshot = await this.collection.add(userWithoutId);
   
    const doc = (await snapshot.get()). data() as User;
    
    return doc
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    await this.collection.doc(id).update(data);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
