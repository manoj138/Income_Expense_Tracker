// helper/errorHandler.js

/**
 * Formats Sequelize errors into a flat object
 */
const formatSequelizeError = (res, error) => {
  let errors = {};
  if (error.name === "SequelizeValidationError") {
    error.errors.forEach((err) => {
      errors[err.path] = err.message;
    });
    return res.status(422).json({ status: false, errors });
  } else if (error.name === "SequelizeUniqueConstraintError") {
    error.errors.forEach((err) => {
      errors[err.path] = `${err.path} already exists`;
    });
    return res.status(422).json({ status: false, errors });
  } else {
    return handle500(res, error);
  }
};

/**
 * Handles 404 Not Found errors
 */
const handle404 = (res, message = "Resource not found") => {
  return res.status(404).json({
    status: false,
    errors: {
      route: message,
    },
  });
};

/**
 * Handles 401 Unauthorized errors (Token expired/Invalid)
 */
const handle401 = (res, message = "Session expired, please login again") => {
  return res.status(401).json({
    status: false,
    errors: {
      auth: message,
    },
  });
};

/**
 * Handles 422 Internal Server errors
 */
const handle422 = (res, errors = {}) => {
  return res.status(422).json({
    status: false,
    errors,
  });
};
/**
 * Handles 500 Internal Server errors
 */
const handle500 = (res, error) => {
  console.error("Internal Server Error:", error);
  return res.status(500).json({
    status: false,
    errors: {
      server: error && error.message ? error.message : "Internal Server Error",
    },
  });
};

module.exports = {
  formatSequelizeError,
  handle404,
  handle401,
  handle422,
  handle500,
};
