import { EntityRepository, AbstractRepository } from 'typeorm';
import { TruckWeightHistory } from '../entity/TruckWeightHistory';

@EntityRepository(TruckWeightHistory)
export class TruckWeightHistoryRepo extends AbstractRepository<TruckWeightHistory> {
  
  // newParcel(): Parcel {
  //   return this.repository.create();
  // }

  async findById(id: string) {
    return this.repository.findOne(id);
  }

  async save(item: TruckWeightHistory) {
    return this.repository.save(item);
  }

  async delete(item: TruckWeightHistory) {
    return this.repository.delete(item);
  }
}
