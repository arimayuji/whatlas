import { FastifyInstance, FastifyReply, FastifyRequest,  } from "fastify";
import { AppError } from "../domain/errors/app-error";
import { InvalidMarginMinutesError } from "../domain/errors/InvalidMarginMinutesError";
import { InvalidDestinationError } from "../domain/errors/InvalidDestinationError";
import { MoreThanThreeDestinationsError } from "../domain/errors/MoreThanThreeDestinationsError";
import { MoreThanFifteenMinutesInMarginError } from "../domain/errors/MoreThanFifteenMinutesInMarginError";
import { UserNotExistsError } from "../domain/errors/UserNotExistsError";
import { UserAlreadyExistsError } from "../domain/errors/UserAlreadyExists";
import { responseError } from "./responseError";

export async  function handleError(app: FastifyInstance) {
  app.setErrorHandler((
    error: Error,
    request: FastifyRequest,
    reply : FastifyReply
  )=> {
    if (error instanceof AppError) {
      return responseError(reply, error.message, error.name);
    }
  
    if (error instanceof InvalidMarginMinutesError) {
      return responseError(reply, error.message, error.name);
    }
  
    if(error instanceof InvalidDestinationError) {
      return responseError(reply, error.message, error.name);
    }
  
    if( error instanceof MoreThanThreeDestinationsError) {
      return responseError(reply, error.message, error.name);
    }
  
    if(error instanceof MoreThanFifteenMinutesInMarginError) {
      return responseError(reply, error.message, error.name);
    }
  
    if( error instanceof UserNotExistsError) {
      return responseError(reply, error.message, error.name);
    }
  
    if (error instanceof UserAlreadyExistsError) {
      return responseError(reply, error.message, error.name);
    }
    return reply.code(500).send({ error: "Internal server error" });
  }) 
}
