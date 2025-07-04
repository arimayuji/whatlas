import { FastifyReply, FastifyRequest, FastifyRequestContext } from "fastify";
import { User } from "../../domain/entities/user.model";
import { CreateUserUseCase } from "../../application/usecases/CreateUserUseCase";
import { GetUserByIdUseCase } from "../../application/usecases/GetUserByIdUseCase";
import { GetAllUsersUseCase } from "../../application/usecases/GetAllUsersUseCase";
import { DeleteUserUseCase } from "../../application/usecases/DeleteUserUseCase";
import { UpdateUserUseCase } from "../../application/usecases/UpdateUserUseCase";
import { responseSuccess } from "../../utils/responseSuccess";

export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,) { }

  async findById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
      const { id } = request.params;

      const user = await this.getUserByIdUseCase.execute({ id });

      if (!user) return reply.code(404).send({ message: "User not found" });

      return responseSuccess(reply, {data: user,message: "Found user", code: 201});
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    const users = await this.getAllUsersUseCase.execute();
    
    return responseSuccess(reply,{data: users, message: "Founded all users", code: 200});
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
      const data = request.body as Omit<User, "id" | "createdAt" | "updatedAt">;

      const user: User = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: null,
      };

      await this.createUserUseCase.execute(user);

      return responseSuccess(reply, {data: user,message: "User created successfully",code: 201});
  }

  async update(
    request: FastifyRequest<{ Params: { id: string }; Body: Partial<User> }>,
    reply: FastifyReply
  ) {
      const { id } = request.params;

      const { destinations, defaultOrigin, marginInMinutes } = request.body;
      
      await this.updateUserUseCase.execute({id, destinations, defaultOrigin, marginInMinutes,});

      return responseSuccess(reply, {data: {id, destinations, defaultOrigin, marginInMinutes,},message: "Updated user with success", code: 200});
  }

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
      const { id } = request.params;

      await this.deleteUserUseCase.execute({ id });

      return responseSuccess(reply, {data: { id }, message: "Deleted user with success", code: 200});
  }
}
