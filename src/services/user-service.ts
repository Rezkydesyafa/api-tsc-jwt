import { logger } from '../utils/logging';
import prisma from '../db/db.config';
import { updateValidation } from '../validations/user.validation';

export const fetchUser = async () => {
  const user = await prisma.user.findMany({
    select: {
      username: true,
      name: true,
    },
  });
  return user;
};

export const updateUser = async (payload, res) => {
  console.log(payload);

  const { error, value } = await updateValidation(payload);
  if (error) {
    logger.error('validate erros', error.details[0].message);
    throw Error(error.details[0].message);
  }
  const find_user = await prisma.user.count({
    where: {
      username: value.username,
    },
  });
  if (find_user === 0) {
    return res.statusCode(404).json({ msg: 'user not found' });
  }
  const datas = {
    name: value.name,
    password: value.password,
  };
  return await prisma.user.update({
    where: {
      username: value.username,
    },
    data: datas,
    select: {
      username: true,
    },
  });
};
