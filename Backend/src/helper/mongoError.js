const formatError = (res, error) => {
  let errors = {};
  if (error.name === "ValidationError") {
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });
    return res.status(422).json({ status: false, errors });
  } else if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    errors[field] = `${field} already exists`;
    return res.status(422).json({ status: false, errors });
  } else if (error.code === 13297) {
    return res.status(500).json({
      status: false,
      errors: {
        server: "MongoDB database name case mismatch detected. Check MONGODB_URI database name casing."
      }
    });
  } else if (error.name === "CastError") {
    errors[error.path] = `Invalid ${error.path}`;
    return res.status(422).json({ status: false, errors });
  } else {
    console.error("Internal Server Error:", error);
    return res.status(500).json({
      status: false,
      errors: {
        server: error && error.message ? error.message : "Internal Server Error"
      }
    });
  }
};

module.exports = { formatError };
