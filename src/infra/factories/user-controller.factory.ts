import { CreateUserUseCase } from "../../application/usecases/CreateUserUseCase"
import { DeleteUserUseCase } from "../../application/usecases/DeleteUserUseCase"
import { GetAllUsersUseCase } from "../../application/usecases/GetAllUsersUseCase"
import { GetUserByIdUseCase } from "../../application/usecases/GetUserByIdUseCase"
import { UpdateUserUseCase } from "../../application/usecases/UpdateUserUseCase"
import { UserController } from "../../presentation/controllers/user.controller"
import { UserRepositoryFirestore } from "../repositories/user.repository"

export function makeUserController() {
  const userRepository = new UserRepositoryFirestore()
  const createUserUseCase = new CreateUserUseCase(userRepository)
  const updateUserUseCase = new UpdateUserUseCase(userRepository)
  const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepository)
  const deleteUserUseCase = new DeleteUserUseCase(userRepository)

  return new UserController(
    createUserUseCase,
    updateUserUseCase,
    getUserByIdUseCase,
    getAllUsersUseCase,
    deleteUserUseCase
  )
}