// index.js
import express from 'express';
import cors from 'cors';
import config from './config.json' with { type: 'json' }; // special syntax for JSON in ES Modules
import productRouter from './routes/product.js'; // must include .js extension
import authRouter from './routes/auth.js'; // must include .js extension

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request: ${req.originalUrl}`);
  next();
});


app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/v1/products', productRouter);

app.use('/api/v1/auth', authRouter);

app.use((req, res) => {
  res.status(404).send('Route not found');
});

const port = process.env.PORT || config.port || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
