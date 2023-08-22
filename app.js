require('dotenv').config();
require('express-async-errors');
const express = require('express');

const connectDB = require('./db/connectDB');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');
const isAuthenticatedMiddleware = require('./middlewares/isAuthenticated');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('app is working');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', isAuthenticatedMiddleware, userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
