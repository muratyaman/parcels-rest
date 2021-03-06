import { Application } from 'express';
import { Connection } from 'typeorm';
import { ParcelsRepo, TrucksRepo, UsersRepo, TruckWeightHistoryRepo } from './repos';

export interface IProcessEnv {
  HTTP_PORT?: string;
  BASE_PATH?: string;
  JWT_SECRET?: string;

  TYPEORM_CACHE?: string;
  TYPEORM_CACHE_ALWAYS_ENABLED?: string;
  TYPEORM_CACHE_DURATION?: string;
  TYPEORM_CACHE_OPTIONS?: string;
  TYPEORM_CONNECTION?: string;
  TYPEORM_DATABASE?: string;
  TYPEORM_DEBUG?: string;
  TYPEORM_DRIVER_EXTRA?: string;
  TYPEORM_DROP_SCHEMA?: string;
  TYPEORM_ENTITIES?: string;
  TYPEORM_ENTITIES_DIR?: string;
  TYPEORM_ENTITY_PREFIX?: string;
  TYPEORM_HOST?: string;
  TYPEORM_LOGGER?: string;
  TYPEORM_LOGGING?: string;
  TYPEORM_MAX_QUERY_EXECUTION_TIME?: string;
  TYPEORM_MIGRATIONS?: string;
  TYPEORM_MIGRATIONS_DIR?: string;
  TYPEORM_MIGRATIONS_RUN?: string;
  TYPEORM_MIGRATIONS_TABLE_NAME?: string;
  TYPEORM_PASSWORD?: string;
  TYPEORM_PORT?: string;
  TYPEORM_SCHEMA?: string;
  TYPEORM_SID?: string;
  TYPEORM_SUBSCRIBERS?: string;
  TYPEORM_SUBSCRIBERS_DIR?: string;
  TYPEORM_SYNCHRONIZE?: string;
  TYPEORM_URL?: string;
  TYPEORM_USERNAME?: string;
  TYPEORM_UUID_EXTENSION?: string;
}

export interface IConfig {
  http: {
    port: number;
    basePath: string;
  };
  auth: {
    jwtSecret: string;
  };
}

export interface ParcelsDb {
  conn: Connection;
  parcelsRepo: ParcelsRepo;
  trucksRepo: TrucksRepo;
  usersRepo: UsersRepo;
  truckWeightHistoryRepo: TruckWeightHistoryRepo;
}

export interface BootResult {
  httpServer: Application;
  db: ParcelsDb;
}
