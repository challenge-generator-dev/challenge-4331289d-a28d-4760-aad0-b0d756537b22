import { HttpException, HttpExceptionOptions } from './http.exception.js';

export class ConflictException extends HttpException {
  constructor(message: string = 'Conflicto de datos', details?: Record<string, unknown>) {
    const options: HttpExceptionOptions = {
      message,
      errorCode: 'CONFLICT',
      statusCode: 409,
      details
    };
    super(options);
    this.name = 'ConflictException';
  }

  static fromDuplicateName(entityName: string, fieldValue: string): ConflictException {
    return new ConflictException(
      `El ${entityName} con '${fieldValue}' ya existe en el sistema`,
      { field: entityName.toLowerCase(), value: fieldValue }
    );
  }

  static fromBusinessRule(rule: string): ConflictException {
    return new ConflictException(
      `Violación de regla de negocio: ${rule}`,
      { rule }
    );
  }

  toJSON(): Record<string, unknown> {
    return {
      statusCode: this.statusCode,
      error: this.errorCode,
      message: this.message,
      timestamp: this.timestamp.toISOString(),
      ...(this.details && { details: this.details })
    };
  }
}