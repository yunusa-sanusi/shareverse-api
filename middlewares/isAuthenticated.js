const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const isAuthenticatedMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError(
      'Please login to your account to access the page',
    );
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, username: payload.username };
    next();
  } catch (error) {
    throw new UnauthenticatedError(
      'Could not authentication you. Please login to your account',
    );
  }
};

module.exports = isAuthenticatedMiddleware;
