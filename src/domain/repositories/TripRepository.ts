import { Trip } from "../entities/trip.model"

export interface TripRepository {
  addUserTrip(trip: Trip,userId: string): Promise<Trip>
  deleteUserTrip(tripId: string,userId: string): Promise<boolean>
  getUserHistoryTrips(userId: string,): Promise<Trip[]>
  getUserLastTrip(userId: string): Promise<Trip | null>
  getUserCurrentTrip(userId: string): Promise<Trip | null>
}