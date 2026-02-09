import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { TypeORMError, QueryFailedError } from 'typeorm';
import { DB_VALIDATION_MESSAGES } from '../constants/message.constant';

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof QueryFailedError) {
      const errorCode = (exception.driverError as { code: string })?.code;

      if (errorCode && DB_VALIDATION_MESSAGES[errorCode]) {
        status = HttpStatus.CONFLICT;
        message = DB_VALIDATION_MESSAGES[errorCode];
      }
    }

    console.error('Database Error:', exception.message);

    response.status(status).json({
      statusCode: status,
      message: message,
      error:
        status === HttpStatus.CONFLICT ? 'Conflict' : 'Internal Server Error',
    });
  }
}
