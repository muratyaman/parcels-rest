import jwt from 'express-jwt';
import { IConfig } from './types';

export function jwtMiddleware(config: IConfig) {
  return jwt({
    secret: config.auth.jwtSecret,
    algorithms: ['HS256'],
    credentialsRequired: false,
  });
}
