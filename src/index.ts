import express, { Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app : Application= express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.json({testing :"blabala"})
});
app.listen(port, () => {
  console.log(`server is running in ${port}`);
});
