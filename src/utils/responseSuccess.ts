import { FastifyReply } from "fastify";
import { success } from "zod/v4";

export function responseSuccess(reply: FastifyReply, data: any, message = "Success", code = 200) {
  reply.code(200).send({
    success: true,
    message,
    data,
    code
  });
}