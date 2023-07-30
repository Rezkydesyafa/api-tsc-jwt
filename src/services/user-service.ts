import bcrypt from 'bcrypt';
import prisma from '../db/db.config';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  loginValidation,
  registerUserValidations,
} from '../validations/user.validation';
import { logger } from '../utils/logging';
import { UserInterface, loginInterface } from '../types/user-types';
import CONFIG from '../config/enviroment';

dotenv.config();
export const registerUser = async (request: UserInterface) => {
  const { error, value } = await registerUserValidations(request);
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

  return accessToken;
};

export const fetchUser = async () => {
  const user = await prisma.user.findMany({
    select: {
      username: true,
      name: true,
      token: true,
    },
  });
  return user;
};
