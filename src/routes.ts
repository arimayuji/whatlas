import { z } from "zod/v4";
import { FastifyTypedInstance } from "./@types/fastify.types";

export async function routes(app: FastifyTypedInstance) {
  app.get("/", async () => {
    return { ok: true };
  });

  app.get(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "List users",
      },
    },
    () => {
      return [];
    }
  );

  app.post(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "Create a new user",
        body: z.object({
          name: z.string(),
          email: z.email(),
        }),
      },
    },
    (request) => {
      const { email, name } = request.body;
      return {};
    }
  );
}
