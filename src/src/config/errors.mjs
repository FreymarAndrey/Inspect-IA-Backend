class CustomError extends Error {
  constructor(statusCode, message, code, description) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.description = description;
  }

  static badRequest(message, code, description) {
    return new CustomError(400, message, code, description);
  }

  static unauthorized(message, code, description) {
    return new CustomError(401, message, code, description);
  }

  static forbidden(message, code, description) {
    return new CustomError(403, message, code, description);
  }

  static notFound(message, code, description) {
    return new CustomError(404, message, code, description);
  }

  static loginError(message, code, description) {
    return new CustomError(200, message, code, description);
  }

  static internalServer(
    message = "Internal Server Error",
    code = "ES5000",
    description = "An uncontrolled error has occurred in the inspectia server."
  ) {
    return new CustomError(500, message, code, description);
  }

  static sqlError(
    message = "Error in SQL query",
    code = "SQ2000",
    description
  ) {
    return new CustomError(
      500,
      message,
      code,
      "An unexpected error occurred while processing your request. Please try again later or contact support if the problem persists"
    );
  }
}

export default CustomError;
