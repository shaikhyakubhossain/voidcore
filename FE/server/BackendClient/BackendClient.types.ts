export interface BackendRequestOptions
  extends Omit<RequestInit, "body"> {
  body?: unknown;

  query?: Record<
    string,
    string | number | boolean | undefined
  >;
}