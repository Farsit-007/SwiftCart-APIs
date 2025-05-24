import { Request, Response } from 'express';
import { paymentService } from './payment.service';

// getAllPayments
const getAllPayments = async (req: Request, res: Response) => {
  const data = await paymentService.getAllPaymentsFromDB();
  res.json(data);
};

export const paymentController = {
  getAllPayments,
};
