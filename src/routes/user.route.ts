import { FastifyTypedInstance } from "../@types/fastify.types";
import { z } from "zod/v4";
import { UserSchema, UserBaseSchema } from "../models/user.model";
import { userController } from "../controllers/user.controller";

export async function userRoutes(app: FastifyTypedInstance) {
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
  );

  app.post(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "Create a new user",
        body: UserBaseSchema,
        response: {
          201: UserSchema,
        },
      },
    },
    userController.create
  );
}
