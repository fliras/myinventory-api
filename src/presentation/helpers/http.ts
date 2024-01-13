export const badRequest = (error: Error) => ({
  statusCode: 400,
  data: error,
});
