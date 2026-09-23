const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    return res.status(404).json({
      error_code: "PRODUCT_NOT_FOUND",
      message: "Product not found",
      timestamp: new Date().toISOString()
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error_code: "VALIDATION_ERROR",
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }

  res.status(500).json({
    error_code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;