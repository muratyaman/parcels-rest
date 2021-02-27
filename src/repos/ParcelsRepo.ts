import { EntityRepository, AbstractRepository } from 'typeorm';
import { Parcel } from '../entity/Parcel';

@EntityRepository(Parcel)
export class ParcelsRepo extends AbstractRepository<Parcel> {
  
  newParcel(): Parcel {
    return this.repository.create();
  }

  async findById(id: string) {
    return this.repository.findOne(id);
  }

  async findAllByTruckId(truckId: string) {
    const result = await this.repository.find({ where: { truckId }});
    return result;
  }

  async save(parcel: Parcel) {
    return this.repository.save(parcel);
  }

  async delete(parcel: Parcel) {
    return this.repository.delete(parcel);
  }

  async totalWeightByTruckId(truckId: string): Promise<number> {
    const parcels = await this.repository.find({ where: { truckId }});
    let totalWeight = 0;
    parcels.forEach(p => { totalWeight += p.weight });
    return totalWeight;
  }
}
