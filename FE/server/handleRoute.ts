import { ValidationError } from "./validation";

export const handleRoute = async <T>(
  callback: () => Promise<T>,
) => {
  try {
    const result = await callback();

    return Response.json(result);
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json(
        {
          error: error.message,
          issues: error.issues,
        },
        {
          status: 400,
        },
      );
    }

    throw error;
  }
};