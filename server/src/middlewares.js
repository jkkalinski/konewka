const notFound = (error, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
};

const errorHandler = (req, res, next) => {
  const error = new Error(
    `These are not the routes you're looking for - ${req.orginalUrl}`,
  );
  res.status(404);
  next(error);
};

module.exports = {
  notFound,
  errorHandler,
};
