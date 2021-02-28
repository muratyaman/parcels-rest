import { success } from './env';
import express from 'express';
import { newConfig } from './config';
import { BootResult, IProcessEnv } from './types';
import { newDb } from './db';
import { newApi } from './api';
import { jwtMiddleware } from './jwtMiddleware';

export async function server(penv: IProcessEnv, startListening = false): Promise<BootResult> {
  if (startListening) console.log('parcel service is loading...');
  if (!success) throw new Error('failed to run dotenv.config');
  const config = newConfig(penv);

  const db = await newDb();

  const { port } = config.http;
  const httpServer = express();
  httpServer.use(express.json());
  httpServer.use(jwtMiddleware(config));
  httpServer.use(config.http.basePath, newApi(config, db));

  if (startListening) {
    httpServer.listen(port, () => {
      console.log(`parcel service is ready at http://localhost:${port}`);
    });
  }

  return { httpServer, db };
}
