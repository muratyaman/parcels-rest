import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRoleEnum {
  GUEST    = 'GUEST',
  ADMIN    = 'ADMIN',
  PACKAGER = 'PACKAGER',
  PICKER   = 'PICKER',
  DRIVER   = 'DRIVER',
}

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, unique: true })
  username: string;

  @Column('varchar', { length: 250 })
  passwordHash: string;

  @Column('varchar', { length: 50 })
  firstName: string;

  @Column('varchar', { length: 50 })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: UserRoleEnum.GUEST
  })
  role: string; // TODO enum is not supported by sqlite
}
