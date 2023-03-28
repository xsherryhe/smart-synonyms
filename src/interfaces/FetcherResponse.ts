interface ErrorData {
  error: string;
}

export interface SuccessResponse {
  type: 'success';
  status: number;
  data: unknown;
}

export interface ErrorResponse {
  type: 'error';
  status?: number;
  data: ErrorData;
}

export type FetcherResponse = SuccessResponse | ErrorResponse;
