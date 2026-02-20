import { CreateAdminDto } from './dto/create-admin.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from './enum/user-role.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashService } from 'src/common/services/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // 1. ป้ายประกาศ: "ขอเครื่องมือจัดการตาราง User จาก Entity"
    private readonly userRepository: Repository<User>, // 2. ตัวแปร: "เอามาเก็บไว้ในชื่อนี้"
    private readonly hashService: HashService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<User> {
    const { password } = createAdminDto;
    const hashpassword = await this.hashService.hash(password);
    const user = this.userRepository.create({
      ...createAdminDto,
      password: hashpassword,
      role: UserRole.ADMIN,
    });

    return await this.userRepository.save(user);
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
