import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class daily_members extends BaseEntity {
  @Column()
  user_id: number;

  @Column()
  club_id: number;

  @Column()
  count: number;

  @PrimaryColumn()
  @CreateDateColumn({ type: 'date' })
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
