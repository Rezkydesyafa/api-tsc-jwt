import dotenv from 'dotenv';
dotenv.config();

const CONFIG = {
  acceesTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};

export default CONFIG;
