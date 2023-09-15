require('dotenv').config();

const connectDB = require('./db/connectDB');
const { Post } = require('./models');

const mockData = require('./mock-data.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Post.create(mockData);
    console.log('data added');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
