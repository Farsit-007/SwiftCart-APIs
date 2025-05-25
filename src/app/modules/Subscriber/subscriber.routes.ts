import express from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.interface';
import { subscriberController } from './subscriber.controller';
import { subscriberValidation } from './subscriber.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(subscriberValidation.addSubscriberZodSchema),
  subscriberController.addSubscriber
);

router.get('/', auth(UserRole.ADMIN), subscriberController.getAllSubscribers);

export const subscriberRoutes = router;
