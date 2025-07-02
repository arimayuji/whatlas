import { Recharge } from "../entities/recharge.model"

export interface RechargeRepository {
  addRecharge(recharge: Recharge,userId: string): Promise<Recharge>
  deleteRecharge(rechargeId: string,userId: string): Promise<boolean>
  getRechargeHistory(userId: string,): Promise<Recharge[]>
  getLastRecharge(userId: string): Promise<Recharge | null>
}