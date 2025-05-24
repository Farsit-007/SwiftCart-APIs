import { Router } from 'express';
import { paymentController } from './payment.controller';

const router = Router();

// getAllPayments
router.get('/', paymentController.getAllPayments);

export default router;
