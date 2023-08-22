const mongoose = require('mongoose');

const connectDB = async (uri) => {
  return await mongoose.connect(uri, {
    family: 4,
  });
};

module.exports = connectDB;
