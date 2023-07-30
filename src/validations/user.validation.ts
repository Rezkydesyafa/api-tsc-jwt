import Joi from 'joi';
import { UserInterface, loginInterface } from '../types/user-types';

export const registerUserValidations = (payload: UserInterface) => {
  const schema = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
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
