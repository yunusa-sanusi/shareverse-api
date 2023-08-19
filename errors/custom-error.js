class CustomError extends Error {
  constructor(message) {
    this.message = message;
  }
}

module.exports = CustomError;
