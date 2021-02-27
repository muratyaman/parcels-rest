import { Request, Response } from 'express';
import { IConfig, ParcelsDb } from '../types';
import { configBool } from '../utils';

export function trucksController(config: IConfig, db: ParcelsDb) {

  async function createTruck(req: Request, res: Response) {
    let data = null, error = null;
    try {
      const { reg, make, model, emptyWeight } = req.body; // TODO validation
      data = await db.trucksRepo.createAndSave(reg, make, model, emptyWeight);
    } catch (err) {
      error = err.message;
    }
    res.json({ data, error });
  }

  async function getTrucks(req: Request, res: Response) {
    // const { q = '', skip = 0, take = 10 } = req.query; // TODO search
    const data = await db.trucksRepo.findAll();
    res.json({ data });
  }

  async function getTruck(req: Request, res: Response) {
    let data = null, error = null;
    try {
      const { truckId } = req.params;
      const { withParcels = '0' } = req.query;
      const withParcelsBool = configBool(String(withParcels));
      data = await db.trucksRepo.findById(truckId, true);
      data = {
        ...data,
        parcelCount: data.parcels.length,
        parcels: withParcelsBool ? data.parcels : undefined,
      };
    } catch (err) {
      error = err.message;
    }
    res.json({ data, error });
  }

  async function updateTruck(req: Request, res: Response) {
    let data = null, error = null;
    try {
      const { truckId } = req.params;
      const { reg, make, model } = req.body; // TODO validation
      const truck = await db.trucksRepo.findById(truckId);
      if (!truck) throw new Error('truck not found');
      truck.reg = reg;
      truck.make = make;
      truck.model = model;
      data = await db.trucksRepo.save(truck);
    } catch (err) {
      error = err.message;
    }
    res.json({ data, error });
  }

  async function delTruck(req: Request, res: Response) {
    let data = null, error = null;
    try {
      const { truckId } = req.params;
      const truck = await db.trucksRepo.findById(truckId);
      if (!truck) throw new Error('truck not found');
      data = await db.trucksRepo.delete(truck);
    } catch (err) {
      error = err.message;
    }
    res.json({ data, error });
  }

  return {
    createTruck,
    getTrucks,
    getTruck,
    updateTruck,
    delTruck,
  }
}
