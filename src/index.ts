import express, { Application } from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/user-route';
import notesRoute from './routes/notes-route';
import authRoute from './routes/auth-routes';
import cookieParser from 'cookie-parser';

dotenv.config();
const app: Application = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', notesRoute);
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    name: 'Ekiww-Public-Api',
    version: '1.0.0',
    docs_link: 'https://comingsoon.com/docs',
    health_check: '100',
    is_open: true,
  });
});
app.listen(port, () => {
  console.log(`server is running in ${port}`);
});
