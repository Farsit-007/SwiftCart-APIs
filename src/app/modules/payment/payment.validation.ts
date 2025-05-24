import { z } from 'zod';

const createPaymentValidationSchema = z.object({
  body: z.object({
    agreement: z.string({
      required_error: 'Agreement is required!',
      invalid_type_error: 'Agreement must be string!',
    }),

    months: z
      .array(
        z.string().refine(val => typeof val === 'string', {
          message: 'Months must be a string!',
        })
      )
      .min(1, { message: 'Months must have minimum 1 item!' }),
  }),
});

const changePaymentStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(['Paid', 'Failed'], {
      errorMap: () => ({
        message: "Update status must be one of 'Paid' and 'Failed'!",
      }),
    }),
  }),
});

const validatePaymentValidationSchema = z.object({
  query: z.object({
    tran_id: z.string({
      required_error: 'Transaction ID is required!',
      invalid_type_error: 'Transaction ID must be string!',
    }),
  }),
});

export const paymentValidation = {
  createPaymentValidationSchema,
  changePaymentStatusValidationSchema,
  validatePaymentValidationSchema,
};
