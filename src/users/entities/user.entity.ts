import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users') // ต้องตรงชื่อ Table ใน DB
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  nick_name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false }) // ป้องกันไม่ให้ส่ง password ออกไปทาง API โดยไม่ตั้งใจ
  password_hash: string;

  @Column({ default: 1200 })
  elo_rating: number;

  @Column({ default: 0 })
  penalty_flags: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
