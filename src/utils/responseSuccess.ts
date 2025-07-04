import { FastifyReply } from "fastify";

export function responseSuccess(reply: FastifyReply, data: any, message = "Success", code = 200) {
  reply.code(200).send(data);
}