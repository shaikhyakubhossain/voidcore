export const buildBackendUrl = (
  path: string,
  query?: Record<
    string,
    string | number | boolean | undefined
  >,
) => {
  const url = new URL(
    path,
    "http://localhost",
  );

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(
          key,
          String(value),
        );
      }
    });
  }

  return `${url.pathname}${url.search}`;
};