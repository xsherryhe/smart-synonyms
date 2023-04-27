export interface ErrorData {
  error: string | string[];
}

export type ErrorDataFromServer = { error?: string; errors?: string[] };

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
