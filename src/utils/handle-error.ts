import { FastifyReply } from "fastify";
import { AppError } from "../domain/errors/app-error";

export function handleError(error: unknown, reply: FastifyReply) {
  if (error instanceof AppError) {
    return reply.code(error.statusCode).send({ error: error.message });
  }

  return reply.code(500).send({ error: "Internal server error" });
}
