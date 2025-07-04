import { createSupabaseClient } from "../clients/supabase.client";
import { BalanceRepositoryFirestore } from "./balance.repository";
import { GeoRepository } from "./geo.repository";
import { RechargeRepositoryFirestore } from "./recharge.repository";
import { TrainStatusFirestoreRepository } from "./train-status.repository";
import { TripRepositoryFirestore } from "./trip.repository";
import { UserRepositoryFirestore } from "./user.repository";

export const repositories = {
  userRepository: new UserRepositoryFirestore(),
  geoRepository: new GeoRepository(createSupabaseClient()),
  tripRepository: new TripRepositoryFirestore(),
  trainStatusRepository: new TrainStatusFirestoreRepository(),
  rechargeRepository: new RechargeRepositoryFirestore(),
  balanceRepository: new BalanceRepositoryFirestore(),
}