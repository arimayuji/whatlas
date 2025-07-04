import { firestore } from "../../utils/firebase";
import {  Trip, TripModelSchema } from "../../domain/entities/trip.model";
import { TripRepository } from "../../domain/repositories/TripRepository";
import { parseOrThrow } from "../../utils/parse-or-null";

export class TripRepositoryFirestore implements TripRepository {
  private readonly collection = firestore.collection("users");

  async addUserTrip(trip: Trip, userId: string): Promise<Trip> {
    const { id, ...tripData } = trip;

    const snapshot = await this.collection.doc(userId)
      .collection("trips")
      .add(tripData);
    
    const createdSnap = await snapshot.get();

    return parseOrThrow(
      TripModelSchema,
      createdSnap.data(),
      `Dados inválidos ao adicionar viagem para usuário ${userId}`
    );
  }

  async deleteUserTrip(tripId: string, userId: string): Promise<boolean> {
    const docRef = this.collection.doc(userId)
      .collection("trips")
      .doc(tripId);
    
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return false;
    }

    await docRef.delete();

    return true;
  }

  async getUserHistoryTrips(userId: string): Promise<Trip[]> {
    const snapshot = await this.collection.doc(userId)
      .collection("trips")
      .get();
    
    return snapshot.docs.map(doc =>
      parseOrThrow(
        TripModelSchema,
        doc.data(),
        `Dados inválidos no histórico de viagens do usuário ${userId}`
      )
    );
  }

  async getUserLastTrip(userId: string): Promise<Trip | null> {
    const snapshot = await this.collection.doc(userId)
      .collection("trips")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();
    const doc = snapshot.docs[0];
    if (!doc) return null;
    return parseOrThrow(
      TripModelSchema,
      doc.data(),
      `Dados inválidos na última viagem do usuário ${userId}`
    );
  }

  async getUserCurrentTrip(userId: string): Promise<Trip | null> {
    const snapshot = await this.collection.doc(userId)
      .collection("trips")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();
    
    const doc = snapshot.docs[0];

    if (!doc) return null;
    
    return parseOrThrow(
      TripModelSchema,
      doc.data(),
      `Dados inválidos na viagem atual do usuário ${userId}`
    );
  }
}
