import { Request, Response } from 'express';
import { paymentService } from './payment.service';

const getAll = async (req: Request, res: Response) => {
  const data = await paymentService.getAll();
  res.json(data);
};

export const paymentController = {
  getAll,
};
