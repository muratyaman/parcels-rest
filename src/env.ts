import dotenv from 'dotenv';
import 'reflect-metadata';
const result = dotenv.config();
export const success = result.parsed !== null;
