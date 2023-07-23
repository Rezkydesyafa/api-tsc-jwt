import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('testing');
});
app.listen(port, () => {
  console.log(`server is running in ${port}`);
});
