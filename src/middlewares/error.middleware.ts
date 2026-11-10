import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpException } from '../exceptions/http.exception.js';

const logger = {
  error: (message: string, meta?: Record<string, unknown>) => console.error(message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => console.warn(message, meta),
  info: (message: string, meta?: Record<string, unknown>) => console.info(message, meta),
  debug: (message: string, meta?: Record<string, unknown>) => console.debug(message, meta)
};

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path?: string;
  method?: string;
}

export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const isHttpException = err instanceof HttpException;
  const statusCode = isHttpException ? err.statusCode : 500;
  const message = isHttpException ? err.message : 'Error interno del servidor';
  const errorCode = isHttpException ? err.errorCode : 'INTERNAL_SERVER_ERROR';

  const errorResponse: ErrorResponse = {
    statusCode,
    message,
    error: errorCode,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  };

  if (statusCode >= 500) {
    logger.error(`[${req.method}] ${req.path} - ${statusCode}: ${message}`, {
      stack: err.stack,
      body: req.body
    });
  } else if (statusCode >= 400) {
    logger.warn(`[${req.method}] ${req.path} - ${statusCode}: ${message}`, {
      body: req.body
    });
  }

  res.status(statusCode).json(errorResponse);
};