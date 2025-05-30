import { Router } from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.interface';
import { ShopController } from './shop.controller';
import { parseBody } from '../../middleware/bodyParser';
import { multerUpload } from '../../config/multer.config';
import validateRequest from '../../middleware/validateRequest';
import { ShopValidation } from './shop.validation';


const router = Router();

router.get(
    '/my-shop',
    auth(UserRole.USER),
    ShopController.getMyShop
)

router.post(
    '/',
    auth(UserRole.USER, UserRole.ADMIN),
    multerUpload.single('logo'),
    parseBody,
    validateRequest(ShopValidation.createShopValidation),
    ShopController.createShop
)

router.get('/',auth(UserRole.ADMIN) ,ShopController.getAllShops)
router.delete('/:id',auth(UserRole.ADMIN, UserRole.USER), ShopController.deleteShop)

export const ShopRoutes = router;
