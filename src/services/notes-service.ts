import prisma from '../db/db.config';
import { logger } from '../utils/logging';
import { createNotesValidate } from '../validations/notes.validation';

export const createNotes = async (req: any) => {
  const { error, value } = await createNotesValidate(req);
  if (error) {
    logger.error('validate erros', error.details[0].message);
    throw Error(error.details[0].message);
  }
  value.username = req.username;

  return await prisma.notes.create({
    data: value,
  });
};
