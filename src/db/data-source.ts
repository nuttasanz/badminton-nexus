import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin', // เช็คให้ตรงกับ docker-compose
  password: 'password123', // เช็คให้ตรงกับ docker-compose
  database: 'badminton_db',
  entities: [User],
  migrations: ['dist/db/migrations/*.js'], // ชี้ไปที่ไฟล์ที่ compile แล้ว
  synchronize: false, // มือโปรต้อง false แล้วใช้ Migration เท่านั้น
});
