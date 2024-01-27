import { Controller } from '@/presentation/contracts';
import { Request, Response } from 'express';

export const adaptExpressRoute = (controller: Controller) => {
  return (req: Request, res: Response): void => {
    const input = { ...req.body };
    controller.handle(input).then(({ statusCode, data }) => {
      const success = statusCode >= 200 && statusCode <= 299;
      const content = success ? data : { error: data.message };
      res.status(statusCode).json(content);
    });
  };
};
