import { FastifyInstance, FastifyReply, FastifyRequest,  } from "fastify";
import { AppError } from "../domain/errors/app-error";
import { InvalidMarginMinutesError } from "../domain/errors/InvalidMarginMinutesError";
import { InvalidDestinationError } from "../domain/errors/InvalidDestinationError";
import { MoreThanThreeDestinationsError } from "../domain/errors/MoreThanThreeDestinationsError";
import { MoreThanFifteenMinutesInMarginError } from "../domain/errors/MoreThanFifteenMinutesInMarginError";
import { UserNotExistsError } from "../domain/errors/UserNotExistsError";
import { UserAlreadyExistsError } from "../domain/errors/UserAlreadyExists";
import { responseError } from "./responseError";
import { NegativeRechargeError } from "../domain/errors/NegativeRechargeError";
import { RechargeNotExists } from "../domain/errors/RechargeNotExists";

export async function handleError(app: FastifyInstance) {
  app.setErrorHandler((error: Error, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof UserNotExistsError || error instanceof RechargeNotExists) {
      return responseError(reply, error.message, error.name, 404);
    }

    if (error instanceof UserAlreadyExistsError) {
      return responseError(reply, error.message, error.name, 409);
    }

    if (error instanceof InvalidMarginMinutesError || 
        error instanceof InvalidDestinationError || 
        error instanceof NegativeRechargeError) {
      return responseError(reply, error.message, error.name, 400);
    }

    if (error instanceof MoreThanThreeDestinationsError || 
        error instanceof MoreThanFifteenMinutesInMarginError) {
      return responseError(reply, error.message, error.name, 422);
    }

    if (error instanceof AppError) {
      return responseError(reply, error.message, error.name, 400);
    }

    return reply.code(500).send({ error: "Internal server error" });
  });
}

