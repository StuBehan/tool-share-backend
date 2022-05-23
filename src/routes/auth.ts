import express from 'express';
import { user } from '../../src/models/user';
import jwt from 'jsonwebtoken';

export const router = express.Router();

router.post('/login', async (res: express.Response, req: express.Request) => {
  const loggingInUser = await user.findById(req.body.username);

  if (loggingInUser === null) {
    res.status(401).json({ messge: 'Username or password incorrect' });
  }
  if (loggingInUser.isValidPassword(req.body.password)) {
    const accessToken = jwt.sign({ username: loggingInUser._id }, process.env.TOKEN_SECRET);
    res.status(200).json({ accessToken, user: `${loggingInUser._id}` });
  } else {
    res.status(401).json({ message: 'Username or password Incorrect' });
  }
});
