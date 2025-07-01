import { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../../utils/handle-error";
import { User } from "../../domain/entities/user.model";
import { CreateUserUseCase } from "../../application/usecases/CreateUserUseCase";
import { GetUserByIdUseCase } from "../../application/usecases/GetUserByIdUseCase";
import { GetAllUsersUseCase } from "../../application/usecases/GetAllUsersUseCase";
import { DeleteUserUseCase } from "../../application/usecases/DeleteUserUseCase";
import { UpdateUserUseCase } from "../../application/usecases/UpdateUserUseCase";

export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,) { }

  async findById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;

      const user = await this.getUserByIdUseCase.execute({ id });

      if (!user) return reply.code(404).send({ message: "User not found" });

      reply.send(user);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await this.getAllUsersUseCase.execute();
      
      reply.send(users);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = request.body as Omit<User, "id" | "createdAt" | "updatedAt">;

      const user: User = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: null,
      };

      await this.createUserUseCase.execute(user);

      reply.code(201).send(user);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async update(
    request: FastifyRequest<{ Params: { id: string }; Body: Partial<User> }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;

      const { destinations, defaultOrigin, marginInMinutes } = request.body;
      
      await this.updateUserUseCase.execute({id, destinations, defaultOrigin, marginInMinutes,});

      reply.send().code(200);
    } catch (error) {
      handleError(error, reply);
    }
  }

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;

      await this.deleteUserUseCase.execute({ id });

      reply.code(204).send();
    } catch (error) {
      handleError(error, reply);
    }
  }
}
