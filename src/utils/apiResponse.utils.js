export const successResponse = (res, message, data = {}) => {
  res.status(200).json({
    success: "true",
    message,
    data,
  });
};

export const errorResponse = (res, statusCode, error) => {
  res.status(statusCode).json({
    success: "false",
    error,
  });
};
