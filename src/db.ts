import { createConnection, getCustomRepository } from 'typeorm';
import { ParcelsRepo, TrucksRepo, UsersRepo } from './repos';
import { ParcelsDb } from './types';

export async function newDb(): Promise<ParcelsDb> {
  // TODO: pass options
  const conn = await createConnection();

  const parcelsRepo = getCustomRepository(ParcelsRepo);
  const trucksRepo = getCustomRepository(TrucksRepo);
  const usersRepo = getCustomRepository(UsersRepo);

  return {
    conn,
    parcelsRepo,
    trucksRepo,
    usersRepo,
  };
}
