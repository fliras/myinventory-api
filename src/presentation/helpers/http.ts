import { HttpResponse } from '@/presentation/contracts/http-response';

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  data: new Error('Internal server error'),
});
