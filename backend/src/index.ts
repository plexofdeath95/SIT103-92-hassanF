import express from 'express';
import userRouter from './user/userRouter';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
