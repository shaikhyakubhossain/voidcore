import type { z } from "zod";
import { ValidationError } from "./ValidationError";

export const validateRequest = async <T extends z.ZodTypeAny>(
  request: Request,
  schema: T,
): Promise<z.infer<T>> => {
  const body = await request.json();

  const result = schema.safeParse(body);

  if (!result.success) {
    console.error(
      "[Validation Error]",
      result.error.flatten(),
    );

    throw new ValidationError(
      result.error.flatten(),
    );
  }

  return result.data;
};