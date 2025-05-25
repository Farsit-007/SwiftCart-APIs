import { paymentSslService } from './payment.utils';
import { Payment } from './payment.model';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { Order } from '../order/order.model';
import { IJwtPayload } from '../auth/auth.interface';

// get All Payments
const getAllPaymentsFromDB = async () => {
  const result = await Payment.find().populate(
    'user order shop shop.products.product'
  );

  return result;
};

// get User Payments
const getUserPaymentsFromDB = async (authUser: IJwtPayload) => {
  const payments = await Payment.find({ user: authUser.userId }).populate(
    'user order shop shop.products.product'
  );

  return payments;
};

// getPaymentDetailsFromDB
const getPaymentDetailsFromDB = async (
  paymentId: string,
  authUser: IJwtPayload
) => {
  const payment = await Payment.findById(paymentId).populate(
    'user order shop shop.products.product'
  );

  if (!payment) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Payment not Found!');
  }

  if (authUser.role === 'user') {
    if (payment.user.toString() !== authUser.userId.toString()) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'You are not authorized to view this payment!'
      );
    }
  }

  return payment;
};

// changePaymentStatusInDB
const changePaymentStatusInDB = async (
  paymentId: string,
  status: string,
  authUser: IJwtPayload
) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Payment not Found!');
  }

  if (authUser.role === 'user') {
    if (authUser.userId.toString() !== payment?.user.toString())
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You are not authorized to update this payment!'
      );
  }

  const result = await Payment.findByIdAndUpdate(
    paymentId,
    { status },
    { new: true }
  );

  return result;
};

// validate Payment
const validatePayment = async (tran_id: string, userData: IJwtPayload) => {
  const payment = await Payment.findOne({ transactionId: tran_id });
  if (!payment) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Payment not Found!');
  }

  // user is striked here
  if (userData.role === 'user') {
    if (userData.userId.toString() !== payment?.user.toString()) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You are not authorized to update this payment!'
      );
    }
  }

  if (payment.status !== 'Pending') {
    throw new AppError(
      StatusCodes.CONFLICT,
      `You can't verify a ${payment.status} payment!`
    );
  }

  const order = await Order.findById(payment.order);
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not Found!');
  }

  const result = await paymentSslService.validatePayment(tran_id);
  return result;
};

export const PaymentService = {
  getAllPaymentsFromDB,
  getUserPaymentsFromDB,
  getPaymentDetailsFromDB,
  changePaymentStatusInDB,
  validatePayment,
};
