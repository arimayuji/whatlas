import { UserCardBalance } from "../../domain/entities/user-card-balance.model";
import { BalanceRepository } from "../../domain/repositories/BalanceRepository";
import { firestore } from "../../utils/firebase";

export class BalanceRepositoryFirestore implements BalanceRepository{
  private readonly collection = firestore.collection("users");
  
  async getUserCardBalance(userId: string): Promise<number> {
    const snapshot = this.collection.doc(userId).collection("cardBalance").doc("current");

    const doc = (await snapshot.get()).data() as UserCardBalance;
    
    return doc.currentBalance
  }
  
  async updateUserCardBalance(userId: string, { currentBalance, updatedAt }: { currentBalance: number; updatedAt: string; }): Promise<void> {
    await this.collection.doc(userId).collection("cardBalance").doc("current").update({
      currentBalance,
      updatedAt
    })
  }
  
  async getRemainingTickets(userId: string): Promise<{ busTickets: number; subwayTickets: number; }> {
    const snapshot = this.collection.doc(userId).collection("cardBalance").doc("current");
    
    const doc = (await snapshot.get()).data() as UserCardBalance;

    return {
      busTickets: doc.remainingBusTickets,
      subwayTickets: doc.remainingBusTickets
    }
  }
}