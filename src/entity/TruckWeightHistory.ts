import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Truck } from './Truck';

@Entity()
export class TruckWeightHistory {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  loadedWeight: number;

  @Column()
  createdAt: string; // ISO date string

  @ManyToOne(() => Truck, truck => truck.weightHistoryItems)
  truck: Truck; // truckId will be created
}
