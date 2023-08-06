import Joi from 'joi';
import {
  UserInterface,
  loginInterface,
  updateInterface,
} from '../types/user-types';

export const registerValidation = (payload: UserInterface) => {
  const schema = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
  });
  return schema.validate(payload);
};

export const updateValidation = (payload: updateInterface) => {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).optional(),
  });
  return schema.validate(payload);
};
export const loginValidation = (payload: loginInterface) => {
  const schema = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
  });
  return schema.validate(payload);
};
