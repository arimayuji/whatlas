import { FastifyTypedInstance } from "../../@types/fastify.types";
import { z } from "zod/v4";
import {  User, UserSchema } from "../../domain/entities/user.model";
import { UserController } from "../controllers/user.controller";
import { ZOD_ERRORS_MESSAGES } from "../../utils/error-messages";
import { FastifyReply, FastifyRequest } from "fastify";
import { ResponseSuccessSchema } from "../../utils/responseSuccess";

export async function userRoutes(
  app: FastifyTypedInstance,
  userController: UserController
) {
  app.get(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "List all users",
        response: {
          200:  ResponseSuccessSchema,
        },
      },
    },
    (req: FastifyRequest, res: FastifyReply) => userController.findAll(req, res)
  );

  app.get(
    "/users/:id",
    {
      schema: {
        tags: ["users"],
        description: "Get a user by ID",
        params: z.object({
          id: z.string().nonempty({ error: ZOD_ERRORS_MESSAGES["string.nonempty"] }),
        }),
        response: {
          200:  ResponseSuccessSchema,
        },
      },
    },
    (req: FastifyRequest<{ Params: { id: string } }>, res : FastifyReply) => userController.findById(req, res)
  );

  app.delete(
    "/users/:id",
    {
      schema: {
        tags: ["users"],
        description: "Delete a user by ID",
        params: z.object({
          id: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]}),
        }),
      },
    },
   (req : FastifyRequest<{ Params: { id: string } }>, res : FastifyReply) => userController.delete(req, res)
  );

  app.put(
    "/users/:id",
    {
      schema: {
        tags: ["users"],
        description: "Update a user by ID",
        params: z.object({
          id: z.string().nonempty({error: ZOD_ERRORS_MESSAGES["string.nonempty"]}),
        }),
        body: UserSchema,
        response: {
          200:  ResponseSuccessSchema,
        },
      },
    },
   (req : FastifyRequest<{ Params: { id: string }; Body: Partial<User> }>, res : FastifyReply) => userController.update(req, res)
  );

  app.post(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "Create a new user",
        body: UserSchema,
        response: {
          201: ResponseSuccessSchema,
        },
      },
    },
   (req : FastifyRequest<{ Body: User }>, res : FastifyReply<{ Body: User }>) => userController.create(req, res)
  );
}
