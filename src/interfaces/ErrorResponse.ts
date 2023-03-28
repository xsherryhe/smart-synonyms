interface ErrorData {
  error: string;
}

export default interface ErrorResponse {
  status?: number;
  data: ErrorData;
}
