import { createConnection, getConnectionOptions, getCustomRepository } from 'typeorm';
import { ParcelsRepo, TrucksRepo, UsersRepo } from './repos';
import { ParcelsDb } from './types';

export async function newDb(): Promise<ParcelsDb> {
  const options = await getConnectionOptions();
  const conn = await createConnection(options);

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
