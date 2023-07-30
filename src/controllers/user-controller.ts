import { Request, Response } from 'express';
import { fetchUser, loginUser, registerUser } from '../services/user-service';
import { logger } from '../utils/logging';
import response from '../utils/response';

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    response.Sucess('Register is succesfully', result, res);
    logger.info('user- register succesfully');
  } catch (error) {
    logger.error(error.message);
    response.Error(error.message, 400, res);
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const result: any = await loginUser(req.body);

    res.cookie('refreshToken', result, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    // res.json({ result });
    response.Sucess('login succes', result, res);
  } catch (error) {
    logger.error(error.message);
    response.Error(error.message, 400, res);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const result = await fetchUser();
    response.Sucess('OK', result, res);
    logger.info('user- getting user');
  } catch (error) {
    logger.error(error.message);
    response.Error(error.message, 400, res);
  }
};
