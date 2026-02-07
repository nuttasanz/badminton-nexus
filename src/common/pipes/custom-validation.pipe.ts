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
      whitelist: true, // ตัดตัวแปรที่ไม่ได้นิยามใน DTO ออก
      forbidNonWhitelisted: true, // ถ้าส่งตัวแปรแปลกปลอมมา ให้ Error ทันที
      transform: true, // แปลง Type ของข้อมูลให้อัตโนมัติ
      stopAtFirstError: false, // ปิด error ตัวแรก
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
