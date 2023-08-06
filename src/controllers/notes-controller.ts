import { Request, Response } from 'express';
import {
  createNotes,
  deleteNotes,
  getNotes,
  updateNotes,
} from '../services/notes-service';
import { logger } from '../utils/logging';
import response from '../utils/response';

export const get = async (req: Request, res: Response) => {
  try {
    const result = await getNotes(req.body);
    response.Sucess('OK', result, 201, res);
    logger.info('notes-  get notes succes');
  } catch (error) {
    logger.error(error.message);
    response.Error(error.message, 400, res);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const result = await createNotes(req.body);

    response.Sucess('created succes', result, 201, res);
    logger.info('notes-  created notes succes');
  } catch (error) {
    logger.error(error.message);
    response.Error(error.message, 400, res);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const contactId = parseInt(req.params.id);
    req.body.id = contactId;
    const result = await updateNotes(req.body, res);
    response.Sucess('update succes', result, 200, res);
    logger.info('update-  update notes succes');
  } catch (error) {
    logger.error(error.message);
    response.Error(error.message, 400, res);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const contactId = parseInt(req.params.id);
    req.body.id = contactId;
    const result = await deleteNotes(req.body, res);
    response.Sucess('OK', result, 200, res);
    logger.info('delete-  delete notes succes');
  } catch (error) {
    logger.error(error.message);
    response.Error(error.message, 400, res);
  }
};
