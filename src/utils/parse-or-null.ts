import { ZodSchema } from "zod/v4";
import { InfrastructureError } from "../domain/errors/InfrastructureError";

export function parseOrNull<T>(
  schema: ZodSchema<T>,
  data: unknown,
  logger?: { warn(obj: any, msg: string): void }
): T | null {
  const result = schema.safeParse(data);
  if (!result.success) {
    logger?.warn(
      { errors: result.error.format(), payload: data },
      "Payload inválido descartado"
    );
    return null;
  }

  return result.data;
}

export function parseOrThrow<T>(
  schema: ZodSchema<T>,
  data: unknown,
  message: string
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new InfrastructureError(message, 500);
  }

  return result.data;
}
