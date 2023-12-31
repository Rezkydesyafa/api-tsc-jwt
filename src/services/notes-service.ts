import prisma from '../db/db.config';
import { logger } from '../utils/logging';
import {
  createNotesValidate,
  searchValidation,
  updateNotesValidate,
} from '../validations/notes.validation';

export const createNotes = async (payload: any) => {
  console.log(payload);

  const { error, value } = await createNotesValidate(payload);
  if (error) {
    logger.error('validate erros', error.details[0].message);
    throw Error(error.details[0].message);
  }
  value.username = payload.username;

  return await prisma.notes.create({
    data: value,
  });
};

export const getNotes = async (request: any) => {
  return await prisma.notes.findMany({
    where: {
      username: request.username,
    },
  });
};

export const updateNotes = async (payload: any, res) => {
  const { error, value } = await updateNotesValidate(payload);
  if (error) {
    logger.error('validate erros', error.details[0].message);
    throw Error(error.details[0].message);
  }
  const findNotes = await prisma.notes.count({
    where: {
      id: value.id,
      username: value.username,
    },
  });
  if (findNotes === 0) {
    return res.statusCode(404).json({ msg: 'notes not found' });
  }
  const datas = {
    title: value.title,
    tag: value.tag,
    Notes: value.Notes,
  };
  return await prisma.notes.update({
    where: {
      id: parseInt(payload.id),
    },
    data: datas,
    select: {
      id: true,
    },
  });
};

export const deleteNotes = async (payload: any, res) => {
  const findNotes = await prisma.notes.count({
    where: {
      id: payload.id,
      username: payload.username,
    },
  });
  if (findNotes === 0) {
    return res.statusCode(404).json({ msg: 'notes not found' });
  }
  return await prisma.notes.delete({
    where: {
      id: payload.id,
    },
    select: {
      id: true,
    },
  });
};

export const searchNotes = async (payload: any, users: any) => {
  const { error, value } = await searchValidation(payload);
  if (error) {
    logger.error('validate erros', error.details[0].message);
    throw Error(error.details[0].message);
  }
  const skip = (value.page - 1) * value.size;
  const filters = [];
  filters.push({
    username: users,
  });
  if (value.title) {
    filters.push({
      title: {
        contains: value.title,
      },
    });
  }
  if (value.notes) {
    filters.push({
      Notes: {
        contains: value.notes,
      },
    });
  }
  const notes = await prisma.notes.findMany({
    where: {
      AND: filters,
    },
    take: value.size,
    skip,
  });
  const totalitems = await prisma.notes.count({
    where: {
      AND: filters,
    },
  });
  return {
    data: notes,
    paging: {
      page: value.page,
      total_items: totalitems,
      total_page: Math.ceil(totalitems / value.size),
    },
  };
};
