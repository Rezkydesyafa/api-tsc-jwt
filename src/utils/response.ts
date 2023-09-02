import { Response } from 'express';

const Sucess = (
  message: string,
  payload: any,
  statusCode: number,
  res: Response
) => {
  res.status(statusCode);
  const datas = {
    success: true,
    statusCode: res.statusCode,
    message,
    payload,
  };
  res.json(datas);
  res.end();
};

const Error = (message: string, statusCode: number, res: Response) => {
  res.status(statusCode);
  const data = {
    success: false,
    statusCode: statusCode,
    error: {
      message,
    },
  };
  res.json(data);
  res.end();
};

export default {
  Error,
  Sucess,
};
