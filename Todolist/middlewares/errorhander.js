module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === "DEV" ? err.message : "Somthing went wrong";
  res.status(statusCode).json({
    message,
    success: false,
  });
};
