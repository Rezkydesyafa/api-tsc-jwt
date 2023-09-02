import { Request, Response } from 'express';
import { loginUser, logoutUser, registerUser } from '../services/auth-service';
import response from '../utils/response';
import { logger } from '../utils/logging';
import { refreshToken } from '../services/auth-service';
import { TokenInterface } from '../types/user-types';

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    response.Sucess('register succes', result, 201, res);
    logger.info('user- register succes');
  } catch (error) {
    logger.error(error.message);
    response.Error(error.message, 400, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result: any = await loginUser(req.body);
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    logger.info('user- login succes');
    response.Sucess(
      'login succes',
      { accesToken: result.accessToken },
      200,
      res
    );
  } catch (error) {
    logger.error(error.message);
    response.Error(error.message, 400, res);
  }
};

export const logout = async (req: TokenInterface, res: Response) => {
  try {
    const token: any = req.cookies.refreshToken;
    if (!token) return res.sendStatus(204);
    await logoutUser(token, res);
    logger.info('auth- logout succes');
    response.Sucess('OK!', '', 200, res);
  } catch (error) {
    logger.error(error.message);
    response.Error(error.message, 400, res);
  }
};

export const Token = async (req: TokenInterface, res: Response) => {
  try {
    const token: string = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);
    const result = await refreshToken(req, res);
    response.Sucess('request token succes', { token: result }, 200, res);
    logger.info('token- get token succes');
  } catch (error) {
    logger.error(error.message);
    response.Error(error.message, 400, res);
  }
};
