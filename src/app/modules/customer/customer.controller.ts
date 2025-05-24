import { Request, Response } from 'express';
import { customerService } from './customer.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';


const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await customerService.getAll();

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'get all customer successfully',
    data: result,
  });
});

export const CustomerController = {
  getAll
};