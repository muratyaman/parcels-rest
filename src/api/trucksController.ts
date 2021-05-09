import { Request, Response } from 'express';
import { IConfig, ParcelsDb } from '../types';
import { configBool } from '../utils';

export function trucksController(config: IConfig, db: ParcelsDb) {

  async function createTruck(req: Request, res: Response) {
    let data = null, error = null;
    try {
      const { reg, make, model, emptyWeight } = req.body; // TODO validation
      data = await db.trucksRepo.createAndSave(reg, make, model, Number.parseFloat(emptyWeight));
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

  async function getWeightAtDate(req: Request, res: Response) {
    const { truckId } = req.params;
    const { date } = req.query; // select latest record before the given date
    // TODO validate

    const dateGiven = new Date(date);

    // 2012-01-01 ==> 2012-01-01T00:00:00, 2012-01-01T23:59:59

    const truck = await db.trucksRepo.findById(truckId);
    const rows = truck.weightHistoryItems;

    // filter and find rows before given date
    const filteredRows: any[] = rows.filter(r => {
      r.createdAt = new Date(r.createdAt);
      return r.createdAt <= dateGiven;
    }).sort((a, b) => {
      // 0, 1, -1
      if (a < b) return 1;
      if (b < a) return -1;
      return 0;
    });    

    // pick last one
    res.json({ data: filteredRows[filteredRows.length - 1] });
  }

  return {
    createTruck,
    getTrucks,
    getTruck,
    updateTruck,
    delTruck,
    getWeightAtDate,
  }
}
