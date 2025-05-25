import { Router } from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.interface';
import { couponController } from './coupon.controller';
import validateRequest from '../../middleware/validateRequest';
import { couponFormSchema, updateCouponValidationSchema } from './coupon.validation';

const router = Router();

router.post('/', auth(UserRole.USER),validateRequest(couponFormSchema), couponController.createCoupon);

router.get('/', auth(UserRole.ADMIN,UserRole.USER), couponController.getAllCoupon);

router.patch(
  '/:couponCode/update-coupon',
  validateRequest(updateCouponValidationSchema),
  auth(UserRole.ADMIN, UserRole.USER),
  couponController.updateCoupon
);

router.post(
  '/:couponCode',
  auth(UserRole.ADMIN, UserRole.USER),
  couponController.getCouponByCode
);

router.delete(
  '/:couponId',
  auth(UserRole.ADMIN,UserRole.USER),
  couponController.deleteCoupon
);

export const CouponRoutes = router;
