import { FastifyReply, FastifyRequest } from "fastify";
import { AddUserTripUseCase } from "../../application/usecases/AddUserTripUseCase";
import { DeleteUserTripUseCase } from "../../application/usecases/DeleteUserTripUseCase";
import { GetUserHistoryTripsUseCase } from "../../application/usecases/GetUserHistoryTripsUseCase";
import { Trip } from "../../domain/entities/trip.model";
import { responseSuccess } from "../../utils/responseSuccess";

export class TripController {
  constructor(private readonly addUserTripUseCase: AddUserTripUseCase,
    private readonly deleteUserTripUseCase: DeleteUserTripUseCase,
    private readonly getUserHistoryTripsUseCase: GetUserHistoryTripsUseCase
  ){}
  
  async addTrip(req: FastifyRequest<{Params : {userId: string}, Body : {trip: Trip}}>, res : FastifyReply) {
    const { userId } = req.params;
    const { trip } = req.body;

    const result = await this.addUserTripUseCase.execute({ userId, trip });

    return responseSuccess(res, {data: result,message: "Trip added with success",code: 200});
  }

  async deleteTrip(req: FastifyRequest<{Params : {userId: string, tripId: string}}>, res : FastifyReply) {
    const { userId, tripId } = req.params;

    const result = await this.deleteUserTripUseCase.execute({ userId, tripId });

    return responseSuccess(res, {data: result, message:"Trip deleted with success",code: 200});
  }

  async getUserHistoryTrips(req: FastifyRequest<{Params : {userId: string}}>, res : FastifyReply) {
    const { userId } = req.params;  

    const result = await this.getUserHistoryTripsUseCase.execute({ userId });
    
    return responseSuccess(res, {data: result,message: "Trips found with success",code: 200});
  }
}