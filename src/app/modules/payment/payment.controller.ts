import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

// get All Payments (admin)
const getAllPayments = async (req: Request, res: Response) => {
  const result = await PaymentService.getAllPaymentsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Payments retrived succesfully!',
    data: result.data,
    meta: result.meta,
  });
};

// get User Payments
const getUserPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getUserPaymentsFromDB(
    req.query,
    req.user
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Payments retrived succesfully!',
    data: result,
  });
});

// get Payment Details
const getPaymentDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getPaymentDetailsFromDB(
    req.params.paymentId,
    req.user
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Payment retrived succesfully!',
    data: result,
  });
});

// change Payment Status
const changePaymentStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;

  const result = await PaymentService.changePaymentStatusInDB(
    req.params.paymentId,
    status,
    req.user
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Payment status changed succesfully!',
    data: result,
  });
});

// validate Payment
const validatePayment = catchAsync(async (req: Request, res: Response) => {
  const tran_id = req.query.tran_id as string;

  const result = await PaymentService.validatePayment(tran_id, req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Payment validated succesfully!',
    data: result,
  });
});

export const PaymentController = {
  getAllPayments,
  getUserPayments,
  getPaymentDetails,
  changePaymentStatus,
  validatePayment,
};
