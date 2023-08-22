const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Some went wrong, try again later',
  };

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');

    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue);
    const fieldValue = Object.values(err.keyValue);

    customError.msg = `The ${field} ${fieldValue} already exists, Please choose another`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
