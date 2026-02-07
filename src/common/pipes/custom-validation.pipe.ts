import {
  BadRequestException,
  Injectable,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      stopAtFirstError: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.reduce(
          (acc, error) => {
            acc[error.property] = error?.constraints || {};
            return acc;
          },
          {} as Record<string, object>,
        );

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    });
  }
}
