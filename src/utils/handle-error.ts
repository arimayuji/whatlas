import { FastifyInstance, FastifyReply, FastifyRequest,  } from "fastify";
import { AppError } from "../domain/errors/app-error";
import { responseError } from "./responseError";

export async function handleError(app: FastifyInstance) {
  app.setErrorHandler((error: Error, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof AppError) {
      return responseError(reply, error.message, error.name, error.statusCode);
    }

    return reply.code(500).send({ error: "Internal server error" });
  });
}

