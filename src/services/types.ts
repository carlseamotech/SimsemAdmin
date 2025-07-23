export interface ApiError {
  status: number;
  message: string;
  data: unknown;
}

export interface ApiClient {
  get<T>(
    endpoint: string,
    config?: { params?: Record<string, unknown>; headers?: Record<string, string> }
  ): Promise<T>;
  post<T>(
    endpoint: string,
    data: unknown,
    config?: { headers?: Record<string, string> }
  ): Promise<T>;
  put<T>(
    endpoint: string,
    data: unknown,
    config?: { headers?: Record<string, string> }
  ): Promise<T>;
  delete<T>(
    endpoint: string,
    config?: { headers?: Record<string, string> }
  ): Promise<T>;
}
