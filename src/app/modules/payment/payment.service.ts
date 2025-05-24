import { Payment } from './payment.model';

export const paymentService = {
  async getAllPaymentsFromDB() {
    const payments = await Payment.find();
    return payments;
  },
};
