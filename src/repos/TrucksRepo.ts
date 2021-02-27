import { EntityRepository, AbstractRepository } from 'typeorm';
import { Truck } from '../entity/Truck';

@EntityRepository(Truck)
export class TrucksRepo extends AbstractRepository<Truck> {
  
  newTruck(): Truck {
    return this.repository.create();
  }

  async createAndSave(reg: string, make: string, model: string, emptyWeight: number) {
    const truck = new Truck();
    truck.reg = reg;
    truck.make = make;
    truck.model = model;
    truck.emptyWeight = emptyWeight;
    truck.loadedWeight = emptyWeight; // default
    return this.manager.save(truck);
  }
  
  async findByReg(reg: string) {
    return this.repository.findOne({ reg });
  }

  async findById(id: string, withParcels = true) {
    return this.repository.findOne(id, withParcels ? { relations: ['parcels'] } : {});
  }

  async findAll() {
    const result = await this.repository.find({});
    return result;
  }

  async save(truck: Truck) {
    return this.repository.save(truck);
  }

  async delete(truck: Truck) {
    return this.repository.delete(truck);
  }

  totalParcelWeight(truck: Truck) {
    let w = 0;
    truck.parcels.forEach(p => { w += p.weight });
    return w;
  }

  async updateLoadedWeight(truck: Truck) {
    truck.loadedWeight = truck.emptyWeight + this.totalParcelWeight(truck);
    return this.save(truck);
  }
  
  async updateLoadedWeightSql(id: string, loadedWeight: number) {
    return this.repository.update(id, { loadedWeight });
  }
}
