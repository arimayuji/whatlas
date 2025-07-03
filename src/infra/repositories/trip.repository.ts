import { Trip } from "../../domain/entities/trip.model";
import { TripRepository } from "../../domain/repositories/TripRepository";
import { firestore } from "../../utils/firebase";

export class TripRepositoryFirestorre implements TripRepository{
  private readonly collection = firestore.collection("users");

  async addUserTrip(trip: Trip, userId: string): Promise<Trip> {
    const { id, ...tripWithoutId } = trip;

    const snapshot = await this.collection.doc(userId).collection("trips").add(tripWithoutId);

    const doc =( await snapshot.get()). data() as Trip;

    return doc
  }

  async deleteUserTrip(tripId: string, userId: string): Promise<boolean> {
    const snapshot = this.collection.doc(userId).collection("trips").doc(tripId);
  
    const doc = await snapshot.get();
    
    if (!doc.exists) {
      return false;
    }
  
    await doc.ref.delete();

    return true;
  }

  async getUserHistoryTrips(userId: string): Promise<Trip[]> {
    const snapshot = this.collection.doc(userId).collection("trips");

    const docs = (await snapshot.get()).docs;

    return docs.map((doc) => doc.data() as Trip);
  }

  async getUserLastTrip(userId: string): Promise<Trip | null> {
    const snapshot =  this.collection.doc(userId).collection("trips").orderBy("createdAt", "desc").limit(2);
    
    const doc = (await snapshot.get()).docs.at(0);

    return doc ? doc.data() as Trip : null;
  }

  async getUserCurrentTrip(userId: string): Promise<Trip | null> {
    const snapshot = this.collection.doc(userId).collection("trips").orderBy("createdAt", "desc").limit(1);

    const doc = (await snapshot.get()).docs.at(0);

    return doc ? doc.data() as Trip : null
  }
}