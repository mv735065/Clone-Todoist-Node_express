class AppError extends Error {
    constructor(message, statusCode, type) {
      super(message);
      this.statusCode = statusCode;
      this.type = type;
      this.isOperational = true; // Flag to identify operational errors vs programming errors
    Error.captureStackTrace(this, this.constructor);
    }
  }

  class ValidationError extends AppError{
    constructor(message){
   super(message,400,'ValidationError');
    }
  }


  class NotFoundError extends AppError{
    constructor(message){
   super(message,404,'NotFoundError');
    }
  }


  class GeneralError extends AppError{
    constructor(message){
   super(message,404,'GeneralError');
    }
  }

  module.exports={ValidationError,NotFoundError,GeneralError};
