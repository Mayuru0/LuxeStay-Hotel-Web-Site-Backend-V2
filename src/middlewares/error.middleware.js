const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal server error";

  // Handle Mongoose bad ObjectId
  if (err.name === "CastError") {
    message = "Resource not found";
    statusCode = 404;
  }

  // Handle Mongoose duplicate key
  if (err.code === 11000) {
    message = "Duplicate field value entered";
    statusCode = 400;
  }

  // Handle Mongoose validation error
  if (err.name === "ValidationError") {
    message = Object.values(err.errors).map(val => val.message).join(", ");
    statusCode = 400;
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

export default errorHandler;
