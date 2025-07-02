export interface BalanceRepository {
  getUserCardBalance(userId: string): Promise<number>
  updateUserCardBalance(userId: string, { currentBalance, updatedAt }: { currentBalance: number, updatedAt: string }): Promise<void>
  getRemainingTickets(userId: string): Promise<{ busTickets: number, subwayTickets: number }>
}