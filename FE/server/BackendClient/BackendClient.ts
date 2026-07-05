import { env } from "../env";
import { BackendClientError } from "./BackendClientError";
import { DEFAULT_BACKEND_HEADERS } from "./BackendClient.constants";
import { buildBackendUrl } from "./BackendClient.utils";
import type { BackendRequestOptions } from "./BackendClient.types";

export class BackendClient {
  constructor(
    private readonly baseUrl: string,
  ) {}

  private async request<T>(
    path: string,
    options: BackendRequestOptions = {},
  ): Promise<T> {
    const response = await fetch(
      `${this.baseUrl}${buildBackendUrl(
        path,
        options.query,
      )}`,
      {
        ...options,

        headers: {
          ...DEFAULT_BACKEND_HEADERS,
          ...options.headers,
        },

        body:
          options.body !== undefined
            ? JSON.stringify(options.body)
            : undefined,
      },
    );

    if (!response.ok) {
      let errorBody: unknown;

      try {
        errorBody = await response.json();
      } catch {
        errorBody = undefined;
      }

      throw new BackendClientError(
        response.status,
        response.statusText,
        errorBody,
      );
    }

    return response.json() as Promise<T>;
  }

  get<T>(
    path: string,
    options?: Omit<
      BackendRequestOptions,
      "body"
    >,
  ) {
    return this.request<T>(path, options);
  }

  post<T>(
    path: string,
    body?: unknown,
    options?: Omit<
      BackendRequestOptions,
      "body"
    >,
  ) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body,
    });
  }

  put<T>(
    path: string,
    body?: unknown,
    options?: Omit<
      BackendRequestOptions,
      "body"
    >,
  ) {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body,
    });
  }

  patch<T>(
    path: string,
    body?: unknown,
    options?: Omit<
      BackendRequestOptions,
      "body"
    >,
  ) {
    return this.request<T>(path, {
      ...options,
      method: "PATCH",
      body,
    });
  }

  delete<T>(
    path: string,
    options?: Omit<
      BackendRequestOptions,
      "body"
    >,
  ) {
    return this.request<T>(path, {
      ...options,
      method: "DELETE",
    });
  }
}

export const backendClient = new BackendClient(
  env.BACKEND_API_URL,
);