import express from 'express';
import { IConfig, ParcelsDb } from '../types';
import { getHealthCheck } from './healthCheck';
import { trucksController } from './trucksController';
import { parcelsController } from './parcelsController';

export function newApi(config: IConfig, db: ParcelsDb) {
  const router = express.Router();

  router.get('/health', getHealthCheck);

  const trucks = trucksController(config, db);

  router.post('/trucks', trucks.createTruck);
  router.get('/trucks/:truckId', trucks.getTruck);
  router.delete('/trucks/:truckId', trucks.delTruck);
  router.put('/trucks/:truckId', trucks.updateTruck);
  router.patch('/trucks/:truckId', trucks.updateTruck);
  router.get('/trucks', trucks.getTrucks);

  const parcels = parcelsController(config, db);
  router.post('/trucks/:truckId/parcels', parcels.createParcel);
  router.get('/trucks/:truckId/parcels', parcels.getParcels);
  router.delete('/trucks/:truckId/parcels/:parcelId', parcels.delParcel);

  return router;
}
