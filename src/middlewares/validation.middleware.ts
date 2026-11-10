import { Request, Response, NextFunction, RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { BadRequestException, ValidationError as AppValidationError } from '../exceptions/bad-request.exception.js';

const validatorOptions: ValidatorOptions = {
  whitelist: true,
  forbidNonWhitelisted: true
};

export const validateBody = <T>(dtoClass: new () => T): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors: ValidationError[] = await validate(dto as object, validatorOptions);

    if (errors.length > 0) {
      const validationErrors: AppValidationError[] = errors.map((error: ValidationError) => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        return {
          field: error.property,
          message: constraints.join(', ')
        };
      });

      throw new BadRequestException(
        'Error de validación en los datos proporcionados',
        { validationErrors }
      );
    }

    req.body = dto;
    next();
  };
};

export const validateParams = <T>(dtoClass: new () => T): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dto = plainToInstance(dtoClass, req.params);
    const errors: ValidationError[] = await validate(dto as object, validatorOptions);

    if (errors.length > 0) {
      const validationErrors: AppValidationError[] = errors.map((error: ValidationError) => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        return {
          field: error.property,
          message: constraints.join(', ')
        };
      });

      throw new BadRequestException(
        'Error de validación en los parámetros proporcionados',
        { validationErrors }
      );
    }

    req.params = dto as Record<string, string>;
    next();
  };
};

export const validateQuery = <T>(dtoClass: new () => T): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const queryValidatorOptions: ValidatorOptions = {
      whitelist: true,
      forbidNonWhitelisted: false
    };

    const dto = plainToInstance(dtoClass, req.query);
    const errors: ValidationError[] = await validate(dto as object, queryValidatorOptions);

    if (errors.length > 0) {
      const validationErrors: AppValidationError[] = errors.map((error: ValidationError) => {
        const constraints = error.constraints ? Object.values(error.constraints) : [];
        return {
          field: error.property,
          message: constraints.join(', ')
        };
      });

      throw new BadRequestException(
        'Error de validación en los query parameters proporcionados',
        { validationErrors }
      );
    }

    req.query = dto as Record<string, string>;
    next();
  };
};