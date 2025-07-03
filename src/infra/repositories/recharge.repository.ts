import { Recharge } from "../../domain/entities/recharge.model";
import { RechargeRepository } from "../../domain/repositories/RechargeRepository";
import { firestore } from "../../utils/firebase";

export class RechargeRepositoryFirestore implements RechargeRepository{
  private readonly collection = firestore.collection("users")

  async addRecharge(recharge: Recharge, userId: string): Promise<Recharge> {
    const { id, ...rechargeWithoutId } = recharge;
    
    const snapshot = await this.collection.doc(userId).collection("recharges").add(rechargeWithoutId);

    const doc = (await snapshot.get()).data() as Recharge;

    return doc
  }

  async deleteRecharge(rechargeId: string, userId: string): Promise<boolean> {
    const snapshot = this.collection.doc(userId).collection("recharges").doc(rechargeId);

    const doc = await snapshot.get();

    if(!doc.exists) return false;

    await snapshot.delete();

    return true
  }

  async getRechargeHistory(userId: string): Promise<Recharge[]> {
    const snapshot = this.collection.doc(userId).collection("recharges")

    const docs = (await snapshot.get()).docs;

    return docs.map((doc) => doc.data() as Recharge)
  }

  async getLastRecharge(userId: string): Promise<Recharge | null> {
    const snapshot = await this.collection.doc(userId).collection("recharges").orderBy("createdAt", "desc").limit(1).get();

    const doc =(snapshot.docs).at(0) ;

    return doc ? doc.data() as Recharge : null
  }
}