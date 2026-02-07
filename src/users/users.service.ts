import { CreateAdminDto } from './dto/create-admin.dto';
import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRole } from './enum/user-role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { DB_VALIDATION_MESSAGES } from 'src/common/constants/message.constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // 1. ป้ายประกาศ: "ขอเครื่องมือจัดการตาราง User จาก Entity"
    private readonly userRepository: Repository<User>, // 2. ตัวแปร: "เอามาเก็บไว้ในชื่อนี้"
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<User> {
    const user = this.userRepository.create({
      ...createAdminDto,
      role: UserRole.ADMIN,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error: unknown) {
      const errorCode = (error as { code: string }).code;
      if (errorCode && DB_VALIDATION_MESSAGES[errorCode]) {
        throw new ConflictException(DB_VALIDATION_MESSAGES[errorCode]);
      }
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  createUser(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findById(id: string) {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });
  }
}
