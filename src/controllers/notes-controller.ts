import { Request, Response } from 'express';
import { createNotes } from '../services/notes-service';
import { logger } from '../utils/logging';
import response from '../utils/response';

export const create = async (req: Request, res: Response) => {
  try {
    const result = await createNotes(req.body);
    console.log(result);

    response.Sucess('created succes', result, 201, res);
    logger.info('notes-  created notes succes');
  } catch (error) {
    logger.error(error.message);
    response.Error(error.message, 400, res);
  }
};
