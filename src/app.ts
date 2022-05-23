import express from 'express';
import cors from 'cors';

export const app = express();
const port = 8080;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
