import { Request, Response } from 'express';
import { customerService } from './customer.service';

export const getAllCustomers = {
  async getAll(req: Request, res: Response) {
    const data = await customerService.getAll();
    
  },
};
