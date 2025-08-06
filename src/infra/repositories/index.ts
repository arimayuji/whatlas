import { createSupabaseClient } from "../clients/supabase.client";
import { HttpDiretoTrensGateway } from "../gateways/direto-trens.gateway";
import { HttpGoogleApiGateway } from "../gateways/google-api.gateway";
import { BalanceRepositoryFirestore } from "./balance.repository";
import { BusRepositoryFirebaseSupabase } from "./bus.repository";
import { GeoRepository } from "./geo.repository";
import { RechargeRepositoryFirestore } from "./recharge.repository";
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
    trainStatusRepository: new HttpDiretoTrensGateway(),
    rechargeRepository: new RechargeRepositoryFirestore(),
    balanceRepository: new BalanceRepositoryFirestore(),
  }
}