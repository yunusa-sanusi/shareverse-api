const { StatusCodes } = require('http-status-codes');

const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    success: true,
    user: { username: user.username },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new BadRequestError('Please provide an email');
  }
  if (!password) {
    throw new BadRequestError('Please provide an password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    success: true,
    user: { userId: user._id, username: user.username },
    token,
  });
};

module.exports = { login, register };
