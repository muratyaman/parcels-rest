import dotenv from 'dotenv';
import 'reflect-metadata';

const result = dotenv.config();
console.log('DOTENV', result);
export const success = result.parsed !== null;
