import { firestore } from "../../utils/firebase";
import { UserCardBalanceModelSchema, UserCardBalance } from "../../domain/entities/user-card-balance.model";
import { BalanceRepository } from "../../domain/repositories/BalanceRepository";
import { parseOrThrow } from "../../utils/parse-or-null";

export class BalanceRepositoryFirestore implements BalanceRepository {
  private readonly collection = firestore.collection("users");

  async getUserCardBalance(userId: string): Promise<number> {
    const docRef = this.collection
      .doc(userId)
      .collection("cardBalance")
      .doc("current");
    
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new Error(`Saldo de cartão não encontrado para usuário ${userId}`);
    }

    const balance = parseOrThrow(
      UserCardBalanceModelSchema,
      docSnap.data(),
      `Dados inválidos ao obter saldo do cartão para usuário ${userId}`
    );

    return balance.currentBalance;
  }

  async updateUserCardBalance(
    userId: string,
    { currentBalance, updatedAt }: UserCardBalance
  ): Promise<void> {
    parseOrThrow(
      UserCardBalanceModelSchema,
      { currentBalance, updatedAt },
      `Dados inválidos ao atualizar saldo do cartão para usuário ${userId}`
    );

    const docRef = this.collection
      .doc(userId)
      .collection("cardBalance")
      .doc("current");
    
    await docRef.update({ currentBalance, updatedAt });
  }

  async getRemainingTickets(userId: string): Promise<{ busTickets: number; subwayTickets: number }> {
    const docRef = this.collection
      .doc(userId)
      .collection("cardBalance")
      .doc("current");
    
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new Error(`Saldo de cartão não encontrado para usuário ${userId}`);
    }

    const balance = parseOrThrow(
      UserCardBalanceModelSchema,
      docSnap.data(),
      `Dados inválidos ao obter bilhetes restantes para usuário ${userId}`
    );

    return {
      busTickets: balance.remainingBusTickets,
      subwayTickets: balance.remainingSubwayTickets,
    };
  }
}
