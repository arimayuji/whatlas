import { createSupabaseClient } from "../clients/supabase.client";
import { HttpGoogleApiGateway } from "../gateways/google-api.gateway";
import { BalanceRepositoryFirestore } from "./balance.repository";
import { BusRepositoryFirebaseSupabase } from "./bus.repository";
import { GeoRepository } from "./geo.repository";
import { RechargeRepositoryFirestore } from "./recharge.repository";
import { TrainStatusFirestoreRepository } from "./train-status.repository";
import { TripRepositoryFirestore } from "./trip.repository";
import { UserRepositoryFirestore } from "./user.repository";


export function makeRepositories() {
  const supabase = createSupabaseClient()

  return {
    googleApi : new HttpGoogleApiGateway(),
    userRepository: new UserRepositoryFirestore(),
    geoRepository: new GeoRepository(supabase),
    busRepository: new BusRepositoryFirebaseSupabase(supabase),
    tripRepository: new TripRepositoryFirestore(),
    trainStatusRepository: new TrainStatusFirestoreRepository(),
    rechargeRepository: new RechargeRepositoryFirestore(),
    balanceRepository: new BalanceRepositoryFirestore(),
  }
}