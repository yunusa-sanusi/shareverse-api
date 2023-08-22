const { StatusCodes } = require('http-status-codes');

const dashboard = (req, res) => {
  res.status(StatusCodes.OK).json({ page: 'dashboard', user: req.user });
};

const updateUser = (req, res) => {
  res.status(StatusCodes.OK).json({ page: 'update user', user: req.user });
};

const deleteUser = (req, res) => {
  res.status(StatusCodes.OK).json({ page: 'delete user', user: req.user });
};

module.exports = { dashboard, updateUser, deleteUser };
