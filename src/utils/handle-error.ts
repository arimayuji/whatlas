import { FastifyReply } from "fastify";
import { AppError } from "../domain/errors/app-error";
import { InvalidMarginMinutesError } from "../domain/errors/InvalidMarginMinutesError";
import { InvalidDestinationError } from "../domain/errors/InvalidDestinationError";
import { MoreThanThreeDestinationsError } from "../domain/errors/MoreThanThreeDestinationsError";
import { MoreThanFifteenMinutesInMarginError } from "../domain/errors/MoreThanFifteenMinutesInMarginError";
import { UserNotExistsError } from "../domain/errors/UserNotExistsError";
import { UserAlreadyExistsError } from "../domain/errors/UserAlreadyExists";

export function handleError(error: unknown, reply: FastifyReply) {
  if (error instanceof AppError) {
    return reply.code(error.statusCode).send({ error: error.message });
  }

  if (error instanceof InvalidMarginMinutesError) {
    return reply.code(400).send({ error: error.message });
  }

  if(error instanceof InvalidDestinationError) {
    return reply.code(400).send({ error: error.message });
  }

  if( error instanceof MoreThanThreeDestinationsError) {
    return reply.code(400).send({ error: error.message });
  }

  if(error instanceof MoreThanFifteenMinutesInMarginError) {
    return reply.code(400).send({ error: error.message });
  }

  if( error instanceof UserNotExistsError) {
    return reply.code(404).send({ error: error.message });
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.code(409).send({ error: error.message });
  }

  return reply.code(500).send({ error: "Internal server error" });
}
