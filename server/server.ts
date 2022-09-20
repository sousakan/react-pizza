import cors from 'cors';
import express from 'express';

import cartRouter from './routes/cartRouter';

import catalogRouter from './routes/catalogRouter';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use('/cart', cartRouter);
app.use('/catalog', catalogRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
