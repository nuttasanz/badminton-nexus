import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HashService } from 'src/common/services/hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ลงทะเบียน Entity เพื่อใช้ใน Module นี้
  controllers: [UsersController],
  providers: [UsersService, HashService],
  exports: [UsersService],
})
export class UsersModule {}
