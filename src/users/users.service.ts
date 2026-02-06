import { faker } from '@faker-js/faker';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryDeepPartialEntity, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // 1. ป้ายประกาศ: "ขอเครื่องมือจัดการตาราง User จาก Entity"
    private readonly userRepository: Repository<User>, // 2. ตัวแปร: "เอามาเก็บไว้ในชื่อนี้"
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.find({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async seedUsers(count: number) {
    const users: QueryDeepPartialEntity<User>[] = [];

    for (let i = 0; i < count; i++) {
      users.push({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        nick_name: faker.internet.displayName(),
        username: faker.internet.username() + i,
        email: faker.internet.email() + i,
        password_hash: 'mock_password',
        elo_rating: 1200,
      });
    }

    // --- กลยุทธ์การแบ่งก้อน (Chunking Strategy) ---
    const CHUNK_SIZE = 500; // แบ่งก้อนละ 500 แถว (ปลอดภัยและเร็ว)

    try {
      for (let i = 0; i < users.length; i += CHUNK_SIZE) {
        const chunk = users.slice(i, i + CHUNK_SIZE);

        await this.userRepository
          .createQueryBuilder()
          .insert()
          .into(User)
          .values(chunk)
          .execute();

        console.log(`Inserted chunk: ${i} to ${i + chunk.length}`);
      }

      return { message: `Seed ${count} users successfully in chunks!` };
    } catch (error) {
      console.error('Database Error during seeding:', error);
      throw new InternalServerErrorException(
        'Seed failed due to DB constraints',
      );
    }
  }
}
