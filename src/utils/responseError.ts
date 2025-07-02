import { FastifyReply } from "fastify";

export function responseError(reply: FastifyReply, data: any, message = "Error", code = 400) {
  reply.code(400).send({
    success: false,
    message,
    data,
    code
  });
}