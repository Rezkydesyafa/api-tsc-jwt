import { Request, Response } from 'express';
import { fetchUser } from '../services/user-service';
import { logger } from '../utils/logging';
import response from '../utils/response';

export const getUser = async (req: Request, res: Response) => {
  try {
    const result = await fetchUser();
    response.Sucess('OK', result, 200, res);
    logger.info('user- getting user');
  } catch (error) {
    logger.error(error.message);
    response.Error(error.message, 400, res);
  }
};
