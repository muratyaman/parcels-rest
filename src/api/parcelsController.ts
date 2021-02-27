import { Request, Response } from 'express';
import { Parcel } from '../entity/Parcel';
import { IConfig, ParcelsDb } from '../types';

export function parcelsController(config: IConfig, db: ParcelsDb) {

  async function createParcel(req: Request, res: Response) {
    let data = null, error = null;
    try {
      const { truckId } = req.params;
      const truck = await db.trucksRepo.findById(truckId);
      const { weight } = req.body; // TODO validation
      const parcel = new Parcel();
      parcel.truck = truck;
      parcel.weight = weight;

      // add parcel, update truck
      truck.parcels.push(parcel);
      const truckSaved = db.trucksRepo.updateLoadedWeight(truck);
      
      data = await db.parcelsRepo.save(parcel);
      data = { ...data, truck: undefined };
    } catch (err) {
      error = err.message;
    }
    res.json({ data, error });
  }

  async function getParcels(req: Request, res: Response) {
    const { truckId } = req.params;
    // const { q = '', skip = 0, take = 10 } = req.query; // TODO search
    // const data = await db.parcelsRepo.findAllByTruckId(truckId);
    const truck = await db.trucksRepo.findById(truckId);
    const data = truck.parcels;
    res.json({ data });
  }

  async function getParcel(req: Request, res: Response) {
    res.json({ data: 'TODO' });
  }

  async function updateParcel(req: Request, res: Response) {
    res.json({ data: 'TODO' });
  }

  async function delParcel(req: Request, res: Response) {
    let data = null, error = null;
    try {
      const { truckId, parcelId } = req.params;
      const truck = await db.trucksRepo.findById(truckId);
      if (!truck) throw new Error('truck not found');
      
      const parcel = await db.parcelsRepo.findById(parcelId);
      if (!parcel) throw new Error('parcel not found');

      // remove parcel, update truck
      truck.parcels = truck.parcels.filter(p => p.id !== parcel.id);
      const truckSaved = db.trucksRepo.updateLoadedWeight(truck);

      data = await db.parcelsRepo.delete(parcel);
    } catch (err) {
      error = err.message;
    }
    res.json({ data, error });
  }

  return {
    createParcel,
    getParcels,
    getParcel,
    delParcel,
  };
}
