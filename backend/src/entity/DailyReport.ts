import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('daily_report')
export class DailyReport extends BaseEntity {
  @Column()
  club_id: number;

  @Column()
  count: number;

  @CreateDateColumn({ type: 'date', primary: true })
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
