import {
  backendClient,
  handleRoute,
  validateRequest,
} from "@/server";
import { SendMessageRequestSchema } from "./schema";

export async function POST(request: Request) {
  return handleRoute(async () => {
    const body = await validateRequest(
      request,
      SendMessageRequestSchema,
    );

    return backendClient.post(
      "/chat",
      body,
    );
  });
}