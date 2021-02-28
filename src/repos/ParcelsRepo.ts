import { EntityRepository, AbstractRepository } from 'typeorm';
import { Parcel } from '../entity/Parcel';

@EntityRepository(Parcel)
export class ParcelsRepo extends AbstractRepository<Parcel> {
  
  // newParcel(): Parcel {
  //   return this.repository.create();
  // }

  async findById(id: string) {
    return this.repository.findOne(id);
  }

  async save(parcel: Parcel) {
    return this.repository.save(parcel);
  }

  async delete(parcel: Parcel) {
    return this.repository.delete(parcel);
  }
}
