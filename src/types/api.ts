export interface ApiErrorShape {
  message: string;
  status?: number;
}

export type ApiResult<T> = { data: T; error?: never } | { data?: never; error: ApiErrorShape };
