import { Router } from 'express';
import { PaymentController } from './payment.controller';
import { UserRole } from '../user/user.interface';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { paymentValidation } from './payment.validation';

const router = Router();

router.get('/', auth(UserRole.ADMIN), PaymentController.getAllPayments);

router.get('/user', auth(UserRole.USER), PaymentController.getUserPayments);

router.get(
  '/details/:paymentId',
  auth(UserRole.USER, UserRole.ADMIN),
  PaymentController.getPaymentDetails
);

router.patch(
  '/:paymentId/status',
  auth(UserRole.ADMIN),
  validateRequest(paymentValidation.changePaymentStatusValidationSchema),
  PaymentController.changePaymentStatus
);

router.patch(
  '/validate',
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(paymentValidation.validatePaymentValidationSchema),
  PaymentController.validatePayment
);

export const PaymentRoutes = router;
