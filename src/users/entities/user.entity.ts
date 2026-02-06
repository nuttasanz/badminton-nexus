import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enum/user-role.enum';

@Entity('users') // ต้องตรงชื่อ Table ใน DB
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  displayName: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: false, select: false }) // ป้องกันไม่ให้ส่ง password ออกไปทาง API โดยไม่ตั้งใจ
  password: string;

  @Column({ default: 1200 })
  eloRating: number;

  @Column({ default: 0 })
  penaltyFlags: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
