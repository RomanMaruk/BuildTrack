import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

interface ErrorResponseBody {
  statusCode: number;
  message: string | string[];
  error: string;
  path: string;
  timestamp: string;
}

/**
 * Universal error handler.
 *
 * Catches every exception thrown anywhere in the application (controllers,
 * services, guards, pipes, interceptors) and converts it into a consistent,
 * client-friendly JSON response instead of leaking a generic
 * "Internal server error" for cases that are actually client mistakes
 * (e.g. filtering by a column that doesn't exist).
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { statusCode, message, error } = this.resolveException(exception);

    const body: ErrorResponseBody = {
      statusCode,
      message,
      error,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`${request.method} ${request.url} -> ${JSON.stringify(body)}`, (exception as Error)?.stack);
    } else {
      this.logger.warn(`${request.method} ${request.url} -> ${JSON.stringify(body)}`);
    }

    response.status(statusCode).json(body);
  }

  private resolveException(exception: unknown): { statusCode: number; message: string | string[]; error: string } {
    // Already a well-formed Nest HTTP exception (BadRequestException, NotFoundException, etc.)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();
      const message =
        typeof response === 'string' ? response : ((response as { message?: string | string[] }).message ?? exception.message);
      return { statusCode: status, message, error: HttpStatus[status] ?? 'Error' };
    }

    // TypeORM couldn't find a requested entity/record.
    if (exception instanceof EntityNotFoundError) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'The requested resource was not found',
        error: 'Not Found',
      };
    }

    // Errors raised directly by the SQL driver (e.g. invalid column,
    // unique/foreign-key violations, type mismatches, etc.). These are
    // caused by bad client input, not a server bug, so they map to 400.
    if (exception instanceof QueryFailedError) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: this.describeQueryFailedError(exception),
        error: 'Bad Request',
      };
    }

    if (exception instanceof TypeORMError) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
        error: 'Bad Request',
      };
    }

    // Plain `Error` thrown manually somewhere in the codebase, e.g.
    // `throw new Error('No users found...')`. Treated as a 400 by default
    // since these are almost always validation/"not found" style failures.
    if (exception instanceof Error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
        error: 'Bad Request',
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Internal Server Error',
    };
  }

  private describeQueryFailedError(exception: QueryFailedError): string {
    const driverError = (exception as unknown as { driverError?: { code?: string; column?: string; message?: string } })
      .driverError;

    // Postgres error code 42703 = "undefined_column"
    if (driverError?.code === '42703') {
      return `Invalid filter property: ${driverError.column ?? 'unknown'}`;
    }

    return driverError?.message ?? exception.message;
  }
}
