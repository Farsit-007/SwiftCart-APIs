import { Request, Response } from 'express';
import { paymentService } from './payment.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// getAllPayments
const getAllPayments = async (req: Request, res: Response) => {
  const result = await paymentService.getAllPaymentsFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Payments fetched succesfully!',
    data: result,
  });
};

export const paymentController = {
  getAllPayments,
};
