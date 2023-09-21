require('dotenv').config();
require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

const connectDB = require('./db/connectDB');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFoundMiddleware = require('./middlewares/not-found');
const isAuthenticatedMiddleware = require('./middlewares/isAuthenticated');
const { getAllPosts, getSinglePost } = require('./controllers/posts');
const upload = require('./controllers/upload');

const app = express();
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  }),
);

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get('/', (req, res) => {
  res.send('app is working');
});

app.get('/api/v1/posts', getAllPosts);
app.get('/api/v1/posts/:slug', getSinglePost);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', isAuthenticatedMiddleware, userRouter);
app.use('/api/v1/posts', isAuthenticatedMiddleware, postRouter);

app.post('/api/v1/upload', upload);

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
