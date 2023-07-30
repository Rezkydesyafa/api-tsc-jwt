import prisma from '../db/db.config';

import dotenv from 'dotenv';

dotenv.config();

export const fetchUser = async () => {
  const user = await prisma.user.findMany({
    select: {
      username: true,
      name: true,
    },
  });
  return user;
};
