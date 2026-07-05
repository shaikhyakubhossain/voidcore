export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly data?: unknown,
  ) {
    super(`${status} ${statusText}`);
    this.name = "ApiClientError";
  }
}