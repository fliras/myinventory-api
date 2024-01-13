export const badRequest = (error: Error) => ({
  statusCode: 400,
  data: error,
});

export const serverError = () => ({
  statusCode: 500,
  data: new Error('Internal server error'),
});
