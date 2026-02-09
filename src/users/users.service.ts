import { CreateAdminDto } from './dto/create-admin.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from './enum/user-role.enum';
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

  async createAdmin(createAdminDto: CreateAdminDto): Promise<User> {
    const user = this.userRepository.create({
      ...createAdminDto,
      role: UserRole.ADMIN,
    });

    return await this.userRepository.save(user);
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

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) throw new NotFoundException('ไม่พบ username');
    return user;
  }

  async findOneWithPassword(username: string): Promise<User | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .getOne();
    return user;
  }
}
