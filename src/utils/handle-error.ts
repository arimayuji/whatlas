import { FastifyInstance, FastifyReply, FastifyRequest,  } from "fastify";
import { AppError } from "../domain/errors/app-error";
import { responseError } from "./responseError";

export async function handleError(app: FastifyInstance) {
  app.setErrorHandler((error: any, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof AppError) {

      request.log.warn({
        name: error.name,
        message: error.message,
        statusCode: error.statusCode
      }, "Error");

      return responseError(reply, error.message, error.name, error.statusCode);
    }

    if (error.validation) {
      return responseError(reply, error.validation);
    }

    request.log.error({
      err: error,
      stack: error.stack
    })
    
    return responseError(reply, error.message);
  });
}

