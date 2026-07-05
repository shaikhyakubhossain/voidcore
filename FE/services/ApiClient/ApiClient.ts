import { DEFAULT_HEADERS } from "./ApiClient.constants";
import type { RequestOptions } from "./ApiClient.types";
import { buildUrl } from "./ApiClient.utils";
import { ApiClientError } from "./ApiClientError";

export class ApiClient {
  constructor(private readonly baseUrl: string) {}

  private async request<T>(
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const response = await fetch(
      `${this.baseUrl}${buildUrl(path, options.query)}`,
      {
        ...options,

        headers: {
          ...DEFAULT_HEADERS,
          ...options.headers,
        },

        body:
          options.body !== undefined ? JSON.stringify(options.body) : undefined,
      },
    );

    if (!response.ok) {
      throw new ApiClientError(response.status, response.statusText);
    }

    return response.json() as Promise<T>;
  }

  get<T>(path: string, options?: Omit<RequestOptions, "body">) {
    return this.request<T>(path, options);
  }

  post<T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">,
  ) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body,
    });
  }

  put<T>(path: string, body?: unknown, options?: Omit<RequestOptions, "body">) {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body,
    });
  }

  patch<T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body">,
  ) {
    return this.request<T>(path, {
      ...options,
      method: "PATCH",
      body,
    });
  }

  delete<T>(path: string, options?: Omit<RequestOptions, "body">) {
    return this.request<T>(path, {
      ...options,
      method: "DELETE",
    });
  }
}
