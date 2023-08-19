require('dotenv').config();
require('express-async-errors');

const express = require('express');

const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');

const app = express();
app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}...`));
