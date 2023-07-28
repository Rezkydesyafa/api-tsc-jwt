import Joi from 'joi';
import UserInterface from '../types/user-types';

export const registerUserValidations = (payload: UserInterface) => {
  const schema = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
  });
  return schema.validate(payload);
};
