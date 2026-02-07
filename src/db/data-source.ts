import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'password123',
  database: 'badminton_db',
  entities: [User],
  migrations: ['dist/db/migrations/*.ts'],
  synchronize: false,
});
