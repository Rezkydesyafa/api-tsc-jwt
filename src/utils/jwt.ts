import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import CONFIG from '../config/enviroment';
dotenv.config();

export const signjwt = (payload: object, options?: jwt.SignOptions) => {
  return jwt.sign(payload, CONFIG.acceesTokenSecret);
};
