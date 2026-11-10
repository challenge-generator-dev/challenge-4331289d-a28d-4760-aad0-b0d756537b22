export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export interface HttpExceptionOptions {
  message?: string;
  errorCode?: string;
  details?: Record<string, unknown>;
  statusCode?: number;
}

export abstract class HttpException extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly details?: Record<string, unknown>;
  public readonly timestamp: Date;
  public path?: string;

  constructor(options: HttpExceptionOptions) {
    const message = options.message || 'An error occurred';
    super(message);
    
    this.name = this.constructor.name;
    this.statusCode = options.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    this.errorCode = options.errorCode || 'INTERNAL_ERROR';
    this.details = options.details;
    this.timestamp = new Date();
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public toJSON(): Record<string, unknown> {
    const response: Record<string, unknown> = {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      timestamp: this.timestamp.toISOString(),
    };

    if (this.details) {
      response.details = this.details;
    }

    if (this.path) {
      response.path = this.path;
    }

    return response;
  }

  public setPath(path: string): void {
    this.path = path;
  }

  public getHttpStatus(): number {
    return this.statusCode;
  }

  public static isHttpException(error: unknown): error is HttpException {
    return error instanceof HttpException;
  }

  protected static formatValidationErrors(errors: Record<string, string[]>): Record<string, unknown> {
    const formattedErrors: Record<string, string> = {};
    
    for (const [field, messages] of Object.entries(errors)) {
      if (Array.isArray(messages) && messages.length > 0) {
        formattedErrors[field] = messages[0];
      }
    }
    
    return formattedErrors;
  }

  public static fromError(error: Error, statusCode: number = HttpStatusCode.INTERNAL_SERVER_ERROR): HttpException {
    class GenericHttpException extends HttpException {
      constructor(msg: string, code: number) {
        super({ message: msg, statusCode: code, errorCode: 'ERROR_FROM_EXCEPTION' });
      }
    }
    
    return new GenericHttpException(error.message, statusCode);
  }
}