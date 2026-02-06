import { CreateAdminDto } from './dto/create-admin.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // 1. ป้ายประกาศ: "ขอเครื่องมือจัดการตาราง User จาก Entity"
    private readonly userRepository: Repository<User>, // 2. ตัวแปร: "เอามาเก็บไว้ในชื่อนี้"
  ) {}

  createAdmin(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
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
