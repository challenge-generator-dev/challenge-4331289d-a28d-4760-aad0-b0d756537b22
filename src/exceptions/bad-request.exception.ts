import { HttpException, HttpExceptionOptions, HttpStatusCode } from './http.exception';

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface BadRequestExceptionOptions extends HttpExceptionOptions {
  validationErrors?: ValidationError[];
  field?: string;
}

export class BadRequestException extends HttpException {
  public readonly validationErrors?: ValidationError[];
  public readonly field?: string;

  constructor(message: string = 'Bad Request', options?: BadRequestExceptionOptions) {
    super({
      message,
      statusCode: HttpStatusCode.BAD_REQUEST,
      errorCode: options?.errorCode || 'BAD_REQUEST',
      details: options?.details,
    });

    this.validationErrors = options?.validationErrors;
    this.field = options?.field;
  }

  public static fromValidation(validationErrors: ValidationError[]): BadRequestException {
    const message = validationErrors.length === 1 
      ? validationErrors[0].message 
      : `Validation failed for ${validationErrors.length} fields`;

    const details: Record<string, unknown> = {};
    validationErrors.forEach(error => {
      details[error.field] = {
        message: error.message,
        value: error.value,
      };
    });

    return new BadRequestException(message, {
      errorCode: 'VALIDATION_ERROR',
      details,
      validationErrors,
    });
  }

  public static fromField(field: string, message: string, value?: unknown): BadRequestException {
    return new BadRequestException(message, {
      errorCode: 'FIELD_VALIDATION_ERROR',
      field,
      validationErrors: [{ field, message, value }],
    });
  }

  public static invalidId(id: unknown): BadRequestException {
    return new BadRequestException(`Invalid ID format: ${id}`, {
      errorCode: 'INVALID_ID',
      field: 'id',
    });
  }

  public static missingField(field: string): BadRequestException {
    return new BadRequestException(`Field '${field}' is required`, {
      errorCode: 'MISSING_FIELD',
      field,
    });
  }

  public static invalidValue(field: string, reason: string): BadRequestException {
    return new BadRequestException(`Invalid value for field '${field}': ${reason}`, {
      errorCode: 'INVALID_VALUE',
      field,
    });
  }

  public toJSON(): Record<string, unknown> {
    const response = super.toJSON();
    
    if (this.validationErrors && this.validationErrors.length > 0) {
      response.validationErrors = this.validationErrors;
    }
    
    if (this.field) {
      response.field = this.field;
    }
    
    return response;
  }

  public hasValidationErrors(): boolean {
    return Array.isArray(this.validationErrors) && this.validationErrors.length > 0;
  }

  public getFirstError(): ValidationError | undefined {
    if (this.validationErrors && this.validationErrors.length > 0) {
      return this.validationErrors[0];
    }
    return undefined;
  }
}