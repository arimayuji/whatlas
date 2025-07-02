import { FastifyTypedInstance } from "../../@types/fastify.types";
import { z } from "zod/v4";
import {  UserSchema } from "../../domain/entities/user.model";
import { UserController } from "../controllers/user.controller";

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
          200: z.array(UserSchema),
        },
      },
    },
    userController.findAll
  )

  app.get(
    "/users/:id",
    {
      schema: {
        tags: ["users"],
        description: "Get a user by ID",
        params: z.object({
          id: z.string().nonempty(),
        }),
        response: {
          200: UserSchema,
        },
      },
    },
    userController.findById
  );

  app.delete(
    "/users/:id",
    {
      schema: {
        tags: ["users"],
        description: "Delete a user by ID",
        params: z.object({
          id: z.string().nonempty(),
        }),
      },
    },
    userController.delete
  );

  app.put(
    "/users/:id",
    {
      schema: {
        tags: ["users"],
        description: "Update a user by ID",
        params: z.object({
          id: z.string().nonempty(),
        }),
        body: UserSchema,
        response: {
          200: UserSchema,
        },
      },
    },
    userController.update
  );

  app.post(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "Create a new user",
        body: UserSchema,
        response: {
          201: UserSchema,
        },
      },
    },
    userController.create
  );
}
