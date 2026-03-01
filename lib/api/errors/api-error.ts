/**
 * Custom API Error Classes
 * Provides specific error types for different API failure scenarios
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class NetworkError extends ApiError {
  constructor(message = "Network connection failed") {
    super(message, 0, "NETWORK_ERROR");
    this.name = "NetworkError";
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class ValidationError extends ApiError {
  constructor(
    message = "Validation failed",
    public errors?: Record<string, string[]>
  ) {
    super(message, 400, "VALIDATION_ERROR", errors);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class AuthenticationError extends ApiError {
  constructor(message = "Authentication required") {
    super(message, 401, "AUTHENTICATION_ERROR");
    this.name = "AuthenticationError";
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class AuthorizationError extends ApiError {
  constructor(message = "You do not have permission to perform this action") {
    super(message, 403, "AUTHORIZATION_ERROR");
    this.name = "AuthorizationError";
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(message, 404, "NOT_FOUND_ERROR");
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ServerError extends ApiError {
  constructor(message = "Internal server error") {
    super(message, 500, "SERVER_ERROR");
    this.name = "ServerError";
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export class TimeoutError extends ApiError {
  constructor(message = "Request timeout") {
    super(message, 408, "TIMEOUT_ERROR");
    this.name = "TimeoutError";
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

export class ConflictError extends ApiError {
  constructor(message = "Resource conflict") {
    super(message, 409, "CONFLICT_ERROR");
    this.name = "ConflictError";
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class RateLimitError extends ApiError {
  constructor(message = "Too many requests") {
    super(message, 429, "RATE_LIMIT_ERROR");
    this.name = "RateLimitError";
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}
