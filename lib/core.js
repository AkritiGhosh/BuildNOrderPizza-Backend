export const throwNewError = (message, status) => {
  let error = new Error(message);
  error.statusCode = status;
  throw error;
};
