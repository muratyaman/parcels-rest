import { IConfig, IProcessEnv } from './types';
import { configInt } from './utils';

export function newConfig(penv: IProcessEnv): IConfig {
  return {
    http: {
      port: configInt(penv.HTTP_PORT, '9000'),
      basePath: penv.BASE_PATH ?? '/api',
    },
    // db: {}, // TODO
    auth: {
      jwtSecret: penv.JWT_SECRET ?? 'no-jwt-secret-found', // TODO throw error
    },
  };
}
