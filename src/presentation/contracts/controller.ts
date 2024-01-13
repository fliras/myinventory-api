import { HttpResponse } from '@/presentation/contracts/http-response';

export interface Controller<T = any> {
  handle(request: T): Promise<HttpResponse>;
}
