import { Entity, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('invite')
export class Invite extends BaseEntity {
  @Column({ primary: true })
  club_id: number;

  @Column({ primary: true })
  user_id: number;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}
