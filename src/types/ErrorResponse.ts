interface ErrorResponse {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: Date;
}

export default ErrorResponse;
