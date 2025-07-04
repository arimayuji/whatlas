import { FastifyReply } from "fastify";
import { z } from "zod/v4"
import { ZOD_ERRORS_MESSAGES } from "./error-messages";

export const ResponseErrorSchema = z.object({
  message: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]}),
  data: z.any(),
  code: z.number().min(200).max(400).default(400),
})

export type ResponseError = z.infer<typeof ResponseErrorSchema>

export function responseError(reply: FastifyReply, { message, data, code }: ResponseError) {
  reply.code(400).send({
    success: false,
    message,
    data,
    code
  });
}