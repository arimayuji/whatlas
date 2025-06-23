import { FastifyTypedInstance } from "../../@types/fastify.types";
import { trainStatusController } from "../../controllers/train-status.controller";
import { z } from "zod/v4";

export async function trensStatusRoute(app: FastifyTypedInstance) {
  app.get(
    "/trens/status",
    {
      schema: {
        tags: ["trens"],
        description: "Listar status atual de todas as linhas de trem",
      },
    },
    trainStatusController.findAll
  );

  app.get(
    "/trens/status/:id",
    {
      schema: {
        tags: ["trens"],
        description: "Buscar status de uma linha de trem por ID",
        params: z.object({
          id: z.string(),
        }),
      },
    },
    trainStatusController.findById
  );
}
