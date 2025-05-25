import { z } from 'zod';

export const couponValidation = {
   create: z.object({
      name: z.string().min(1, 'Name is required'),
   }),
   update: z.object({
      id: z.string().uuid('Invalid ID format'),
      name: z.string().optional(),
   }),
};
export const couponFormSchema = z.object({
   body: z.object({
  code: z.string()
    .min(1, { message: "Coupon code is required" })
    .max(20, { message: "Coupon code must be at most 20 characters" }),
  
  discountType: z.enum(["Flat", "Percentage"]),
  
  discountValue: z.number()
    .min(0.01, { message: "Discount value must be greater than 0" }),
  
  minOrderAmount: z.number()
    .min(0, { message: "Minimum order amount cannot be negative" }),
  
  maxDiscountAmount: z.number()
    .min(0, { message: "Maximum discount amount cannot be negative" }),
  
  startDate: z.string({
    required_error: "Start date is required",   })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Start date must be a valid date",
    }),
  
  endDate: z.string({
    required_error: "End date is required",   })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Start date must be a valid date",
    }),
})
})

export const updateCouponValidationSchema = z.object({
   body: z
      .object({
         code: z.string().trim().toUpperCase().optional(),
         discountType: z.enum(['Flat', 'Percentage']).optional(),
         discountValue: z.number().min(0).optional(),
         minOrderAmount: z.number().min(0).optional(),
         maxDiscountAmount: z.number().nullable().optional(),
         startDate: z.date().optional(),
         endDate: z.date().optional(),
         isActive: z.boolean().optional(),
      })
      .strict(),
});
