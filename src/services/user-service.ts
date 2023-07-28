import bcrypt from 'bcrypt';
import { registerUserValidations } from '../validations/user.validation';
import { logger } from '../utils/logging';
import prisma from '../db/db.config';
import UserInterface from '../types/user-types';

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

export const fetchUser = async () => {
  const user = await prisma.user.findMany({
    select: {
      username: true,
      name: true,
    },
  });
  return user;
};
