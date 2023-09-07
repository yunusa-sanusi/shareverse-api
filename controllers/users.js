const { StatusCodes } = require('http-status-codes');
const { User, UserProfile } = require('../models');
const { NotFoundError, UnauthenticatedError } = require('../errors');

const dashboard = async (req, res) => {
  const usernameParams = req.params.username;

  const user = await User.findOne({
    username: usernameParams,
  });
  if (!user) {
    throw new NotFoundError('user not found');
  }

  const userProfile = await UserProfile.findOne({ userId: user._id });
  if (!userProfile) {
    throw new NotFoundError(
      `this user ${user.username} does not have a user profile`,
    );
  }

  const { fullname, username, email } = user;

  const userData = { fullname, username, email, userProfile };

  res.status(StatusCodes.OK).json({ success: true, user: { ...userData } });
};

const updateUser = async (req, res) => {
  const usernameParams = req.params.username;

  const user = await User.findOneAndUpdate(
    {
      _id: req.user.userId,
      username: usernameParams,
    },
    req.body,
    { new: true, runValidators: true },
  );

  if (!user) {
    throw new UnauthenticatedError(
      'you are not authorized to perform operations on this account',
    );
  }

  const userProfile = await UserProfile.findOneAndUpdate(
    { userId: user._id },
    req.body,
    { new: true, runValidators: true },
  );
  if (!userProfile) {
    throw new NotFoundError(
      `this user ${user.username} does not have a user profile`,
    );
  }

  const { fullname, username, email } = user;

  const userData = { fullname, username, email, userProfile };

  res.status(StatusCodes.OK).json({ success: true, user: { ...userData } });
};

const deleteUser = async (req, res) => {
  const usernameParams = req.params.username;

  const user = await User.findOneAndRemove({
    _id: req.user.userId,
    username: usernameParams,
  });

  if (!user) {
    throw new UnauthenticatedError(
      'you are not authorized to perform operations on this account',
    );
  }

  await user.cascadeDeleteUserProfile();

  res.status(StatusCodes.OK).json({ success: true, user });
};

module.exports = { dashboard, updateUser, deleteUser };
