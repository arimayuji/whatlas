import { FastifyReply, FastifyRequest } from "fastify";
import { handleError } from "../utils/handle-error";
import { User } from "../domain/entities/user.model";
import { userRepository } from "../infra/repositories/user.repository";

export const userController = {
  async findById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;

      const user = await userRepository.findById(id);

      if (!user) return reply.code(404).send({ message: "User not found" });

      reply.send(user);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await userRepository.findAll();
      reply.send(users);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async findByPhone(
    request: FastifyRequest<{ Querystring: { phone: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { phone } = request.query;

      const user = await userRepository.findByPhone(phone);

      if (!user) return reply.code(404).send({ message: "User not found" });
      reply.send(user);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = request.body as Omit<User, "id" | "createdAt" | "updatedAt">;

      const user: User = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await userRepository.create(user);

      reply.code(201).send(user);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async update(
    request: FastifyRequest<{ Params: { id: string }; Body: Partial<User> }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;

      const existing = await userRepository.findById(id);

      if (!existing) return reply.code(404).send({ message: "User not found" });

      const updated: User = {
        ...existing,
        ...request.body,
        updatedAt: new Date().toISOString(),
      };

      await userRepository.update(id, updated);

      reply.send(updated);
    } catch (error) {
      handleError(error, reply);
    }
  },

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;

      const existing = await userRepository.findById(id);

      if (!existing) return reply.code(404).send({ message: "User not found" });

      await userRepository.delete(id);

      reply.code(204).send();
    } catch (error) {
      handleError(error, reply);
    }
  },
};
