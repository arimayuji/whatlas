import { firestore } from "../../utils/firebase";
import { UserSchema, User } from "../../domain/entities/user.model";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { parseOrThrow } from "../../utils/parse-or-null";
import { InfrastructureError } from "../../domain/errors/InfrastructureError";

export class UserRepositoryFirestore implements UserRepository {
  private readonly collection = firestore.collection("users");

  async findAll(): Promise<User[]> {
      const snapshot = await this.collection.get();
      return snapshot.docs.map(doc =>
        parseOrThrow(
          UserSchema,
          doc.data(),
          'Erro ao validar dados do usuário no Firestore'
        )
      );
  }

  async findById(id: string): Promise<User | null> {
      const docSnap = await this.collection.doc(id).get();
      if (!docSnap.exists) return null;
      return parseOrThrow(
        UserSchema,
        docSnap.data(),
        `Dados inválidos para usuário com id ${id}`
      );
  }

  async create(user: User): Promise<User> {
      const { id, ...data } = user;
      const writeSnap = await this.collection.add(data);
      const createdSnap = await writeSnap.get();
      return parseOrThrow(
        UserSchema,
        createdSnap.data(),
        'Dados inválidos ao criar usuário no Firestore'
      );
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    try {
      await this.collection.doc(id).update(data);
    } catch (err) {
      throw new InfrastructureError(
        `Erro ao atualizar usuário com id ${id} no Firestore`,
        500
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.collection.doc(id).delete();
    } catch (err) {
      throw new InfrastructureError(
        `Erro ao deletar usuário com id ${id} no Firestore`,
        500
      );
    }
  }
}
