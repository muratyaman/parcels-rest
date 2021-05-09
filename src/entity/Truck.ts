import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Parcel } from './Parcel';
import { TruckWeightHistory } from './TruckWeightHistory';

@Entity()
export class Truck {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 10, unique: true })
  reg: string;

  @Column('varchar', { length: 50 })
  make: string;

  @Column('varchar', { length: 50 })
  model: string;

  @Column()
  emptyWeight: number;

  @Column()
  loadedWeight: number;

  @OneToMany(() => Parcel, parcel => parcel.truck)
  parcels: Parcel[];

  @OneToMany(() => TruckWeightHistory, it => it.truck)
  weightHistoryItems: TruckWeightHistory[];
}
