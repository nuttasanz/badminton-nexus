import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enum/user-role.enum';
import { Exclude } from 'class-transformer';

@Entity('users') // ต้องตรงชื่อ Table ใน DB
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'display_name', nullable: true })
  displayName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Exclude() // ป้องกันไม่ให้ส่ง password ออกไปทาง API โดยไม่ตั้งใจ
  @Column({ select: false })
  password: string;

  @Column({ name: 'elo_rating', nullable: true, default: 1200 })
  eloRating: number;

  @Column({ name: 'penalty_flags', nullable: true, default: 0 })
  penaltyFlags: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
