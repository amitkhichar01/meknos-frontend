export interface BaseApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
}
