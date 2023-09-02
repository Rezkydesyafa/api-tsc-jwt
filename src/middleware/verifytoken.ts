import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import CONFIG from '../config/enviroment';
import response from '../utils/response';
import { logger } from '../utils/logging';

interface Irequest extends Request {
  username: any; // or any other type
}
export const verifyToken = (
  req: Irequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == undefined) return response.Error('Unauthorized', 401, res);
    jwt.verify(token, CONFIG.acceesTokenSecret, (err: any, decoded: any) => {
      if (err) return res.sendStatus(403);
      req.body.username = decoded.username;
      next();
    });
  } catch (error) {
    logger.error(error.message);
    res.json({ msg: error.mesange });
  }
};
