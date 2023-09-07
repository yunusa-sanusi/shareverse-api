const CustomError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated-error');
const NotFoundError = require('./resource-not-found');

module.exports = {
  CustomError,
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
};
