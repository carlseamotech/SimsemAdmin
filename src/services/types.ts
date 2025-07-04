export interface SimsemApi {
  get: <T>(
    endpoint: string,
    config?: { params?: Record<string, unknown> }
  ) => Promise<T>;
  post: <T>(endpoint: string, data: Record<string, unknown>) => Promise<T>;
  put: <T>(endpoint: string, data: Record<string, unknown>) => Promise<T>;
  delete: <T>(endpoint: string) => Promise<T>;
}
