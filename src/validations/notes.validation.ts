import Joi from 'joi';
import { IupdateNotes, createNotes } from '../types/notes-types';
export const createNotesValidate = (payload: createNotes) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    tag: Joi.string().optional().max(100),
    Notes: Joi.string().required(),
    username: Joi.string().optional(),
  });
  return schema.validate(payload);
};
export const updateNotesValidate = (payload: IupdateNotes) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    tag: Joi.string().optional().max(100),
    Notes: Joi.string().optional(),
    username: Joi.string().optional(),
    id: Joi.number().optional(),
  });
  return schema.validate(payload);
};

export const searchValidation = (payload: any) => {
  const schema = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).max(100).positive().default(10),
    title: Joi.string().optional(),
    notes: Joi.string().optional(),
  });
  return schema.validate(payload);
};
