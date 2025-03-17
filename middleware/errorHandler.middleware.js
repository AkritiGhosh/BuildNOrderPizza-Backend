export const errorHandler = (err, req, res, next) => {
  try {
    console.error(err);
    res.status(err.statusCode).json({ success: false, message: err?.message });
  } catch (error) {
    next(error);
  }
};
