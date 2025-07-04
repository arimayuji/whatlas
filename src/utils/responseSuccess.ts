import { FastifyReply } from "fastify";
import { z } from "zod/v4"
import { ZOD_ERRORS_MESSAGES } from "./error-messages";

export const ResponseSuccessSchema = z.object({
  message: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]}),
  data: z.any(),
  code: z.number().min(200).max(400).default(200),
})

export type ResponseSuccess = z.infer<typeof ResponseSuccessSchema>

export function responseSuccess(reply: FastifyReply, {code, message, data,}:ResponseSuccess) {
  reply.code(200).send({
    success: true,
    message,
    data,
    code
  });
}