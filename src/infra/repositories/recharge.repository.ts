import { firestore } from "../../utils/firebase";
import { RechargeModelSchema, Recharge } from "../../domain/entities/recharge.model";
import { RechargeRepository } from "../../domain/repositories/RechargeRepository";
import { parseOrThrow } from "../../utils/parse-or-null";

export class RechargeRepositoryFirestore implements RechargeRepository {
  private readonly collection = firestore.collection("users");

  async addRecharge(recharge: Recharge, userId: string): Promise<Recharge> {
    const { id, ...data } = recharge;

    const snapshot = await this.collection
      .doc(userId)
      .collection("recharges")
      .add(data);
    
    const createdSnap = await snapshot.get();

    return parseOrThrow(
      RechargeModelSchema,
      createdSnap.data(),
      `Dados inválidos ao adicionar recarga para usuário ${userId}`
    );
  }

  async deleteRecharge(rechargeId: string, userId: string): Promise<boolean> {
    const docRef = this.collection
      .doc(userId)
      .collection("recharges")
      .doc(rechargeId);
    
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return false;
    } 

    await docRef.delete();

    return true;
  }

  async getRechargeHistory(userId: string): Promise<Recharge[]> {
    const snapshot = await this.collection
      .doc(userId)
      .collection("recharges")
      .get();
    
    return snapshot.docs.map(doc =>
      parseOrThrow(
       RechargeModelSchema,
        doc.data(),
        `Dados inválidos no histórico de recargas do usuário ${userId}`
      )
    );
  }

  async getLastRecharge(userId: string): Promise<Recharge | null> {
    const snapshot = await this.collection
      .doc(userId)
      .collection("recharges")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();
    const doc = snapshot.docs[0];
    if (!doc) {
      return null;
    }
    return parseOrThrow(
     RechargeModelSchema,
     doc.data(),
     `Dados inválidos na última recarga do usuário ${userId}`
    );
  }
}
