import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Truck } from './Truck';

@Entity()
export class Parcel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Truck, truck => truck.parcels)
  truck: Truck; // truckId will be created

  @Column()
  weight: number;
}
