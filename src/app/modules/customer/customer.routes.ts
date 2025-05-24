import { Router } from 'express';
import { CustomerController } from './customer.controller';

const router = Router();

// Define routes
router.get('/', CustomerController.getAll);

export default router;
