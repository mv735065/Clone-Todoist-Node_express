
const { ValidationError, NotFoundError, GeneralError } = require('../middleware/errorTypes');

const validationErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  next(err);
};

const notFoundErrorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  next(err);
};

const authErrorHandler = (err, req, res, next) => {
  if (err instanceof AuthError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  next(err);
};

const generalErrorHandler = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  next(err); // Pass it to the generic handler
};

// Catch all other errors (for unexpected or server errors)
const catchAllErrorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error'
  });
};

module.exports = {
  validationErrorHandler,
  notFoundErrorHandler,
  generalErrorHandler,
  catchAllErrorHandler
};
