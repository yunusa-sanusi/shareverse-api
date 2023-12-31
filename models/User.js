const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserProfile = require('./UserProfile');
const Post = require('./Post');

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: 50,
      minlength: 3,
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      maxlength: 50,
      minlength: 3,
      trim: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be atleast 8 characters long'],
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;

  // create a user profile after user is create
  await UserProfile.create({ userId: this._id });
});

UserSchema.pre(
  'deleteOne',
  { document: false, query: true },
  async function () {
    // deletes user profile and posts
    await UserProfile.deleteOne({ userId: this._conditions._id });
    await Post.deleteMany({ author: this._conditions.username });
  },
);

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME },
  );
};

UserSchema.methods.comparePasswords = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
