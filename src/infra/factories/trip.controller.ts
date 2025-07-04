import { AddUserTripUseCase } from "../../application/usecases/AddUserTripUseCase";
import { DeleteUserTripUseCase } from "../../application/usecases/DeleteUserTripUseCase";
import { GetUserHistoryTripsUseCase } from "../../application/usecases/GetUserHistoryTripsUseCase";
import { TripController } from "../../presentation/controllers/trip.controller";
import { makeRepositories } from "../repositories";

export function makeTripController() {

  const repositories = makeRepositories()
  
  const addUserTripUseCase = new AddUserTripUseCase(repositories.tripRepository, repositories.userRepository)
  const deleteUserTripUseCase = new DeleteUserTripUseCase(repositories.tripRepository, repositories.userRepository)
  const getUserHistoryTripsUseCase = new GetUserHistoryTripsUseCase(repositories.tripRepository, repositories.userRepository)

  return new TripController(
    addUserTripUseCase,deleteUserTripUseCase,getUserHistoryTripsUseCase
  )
}