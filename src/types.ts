import { Application } from 'express';
import { Connection } from 'typeorm';
import { ParcelsRepo, TrucksRepo, UsersRepo } from './repos';

export interface IProcessEnv {
  HTTP_PORT?: string;
  BASE_PATH?: string;
  DB_TYPE?: string;
  SQLITE_FILE?: string;
  JWT_SECRET?: string;
}

export interface IConfig {
  http: {
    port: number;
    basePath: string;
  };
  // db: DbOptions; // TODO
  auth: {
    jwtSecret: string;
  };
}

export interface ParcelsDb {
  conn: Connection;
  parcelsRepo: ParcelsRepo;
  trucksRepo: TrucksRepo;
  usersRepo: UsersRepo;
}

export interface BootResult {
  config: IConfig;
  httpServer: Application;
}
