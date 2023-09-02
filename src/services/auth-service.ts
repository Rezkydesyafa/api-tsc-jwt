import bcrypt from 'bcrypt';
import prisma from '../db/db.config';
import jwt from 'jsonwebtoken';
import CONFIG from '../config/enviroment';
import { Request, Response } from 'express';
import {
  TokenInterface,
  UserInterface,
  loginInterface,
} from '../types/user-types';
import {
  loginValidation,
  registerValidation,
} from '../validations/user.validation';
import { logger } from '../utils/logging';

export const registerUser = async (request: UserInterface) => {
  const { error, value } = await registerValidation(request);
  if (error) {
    logger.error('validate erros', error.details[0].message);
    throw Error(error.details[0].message);
  }

  const countUser = await prisma.user.count({
    where: {
      username: value.username,
    },
  });
  if (countUser == 1) {
    throw Error('username already exist');
  }

  value.password = await bcrypt.hash(value.password, 10);

  const result = await prisma.user.create({
    data: value,
    select: {
      username: true,
      name: true,
    },
  });
  return result;
};

export const loginUser = async (request: loginInterface) => {
  const { error, value } = await loginValidation(request);
  if (error) {
    logger.error('validate erros', error.details[0].message);
    throw Error(error.details[0].message);
  }
  const user = await prisma.user.findUnique({
    where: {
      username: value.username,
    },
  });
  if (!user) {
    throw new Error('please register before login');
  }
  const matchPassword = await bcrypt.compare(value.password, user.password);
  if (!matchPassword) {
    throw new Error('username or password is worng');
  }
  const { username, name } = user;
  const accessToken = jwt.sign({ username, name }, CONFIG.acceesTokenSecret, {
    expiresIn: '30s',
  });
  const refreshToken = jwt.sign({ username, name }, CONFIG.refreshTokenSecret, {
    expiresIn: '1d',
  });
  await prisma.user.update({
    where: {
      username: username,
    },
    data: {
      token: refreshToken,
    },
  });
  const token = {
    accessToken,
    refreshToken,
  };

  return token;
};

export const refreshToken = async (req: TokenInterface, res: Response) => {
  const refreshToken: string = req.cookies.refreshToken;
  const user = await prisma.user.findFirst({
    where: {
      token: refreshToken,
    },
  });
  if (!user) return res.sendStatus(403);
  const token = jwt.verify(
    refreshToken,
    CONFIG.refreshTokenSecret,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      const { username, name } = user;
      const accesToken = jwt.sign(
        { username, user },
        CONFIG.acceesTokenSecret,
        {
          expiresIn: '160s',
        }
      );
      return accesToken;
    }
  );

  return token;
};

export const logoutUser = async (token: any, response: Response) => {
  // const refreshToken: string = request.cookies.refreshToken;
  const user = await prisma.user.findFirst({
    where: {
      token: token,
    },
  });
  if (!user) return response.sendStatus(204);
  await prisma.user.update({
    where: {
      username: user.username,
    },
    data: {
      token: null,
    },
  });
  response.clearCookie('refreshToken');
};
