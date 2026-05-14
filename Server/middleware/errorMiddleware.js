const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    msg: err.message || "Server Error"
  });
};

export default errorMiddleware;
