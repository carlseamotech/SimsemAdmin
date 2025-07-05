export interface ApiError {
  status: number;
  message: string;
  data: unknown;
}

export interface ApiClient {
  get<T>(endpoint: string, config?: { params?: Record<string, unknown> }): Promise<T>;
  post<T>(endpoint: string, data: unknown): Promise<T>;
  put<T>(endpoint: string, data: unknown): Promise<T>;
  delete<T>(endpoint: string): Promise<T>;
}
