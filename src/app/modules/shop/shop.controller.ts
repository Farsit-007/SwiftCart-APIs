import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { ShopService } from './shop.service';
import { IImageFile } from '../../interface/IImageFile';
import { IJwtPayload } from '../auth/auth.interface';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createShop = catchAsync(async (req: Request, res: Response) => {
  const result = await ShopService.createShop(
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload
  );

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Shop created successfully!',
    data: result,
  });
});

const getMyShop = catchAsync(async (req: Request, res: Response) => {
  const result = await ShopService.getMyShop(req.user as IJwtPayload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Shop retrive successfully!',
    data: result,
  });
});

const getAllShops = catchAsync(async (req: Request, res: Response) => {
  const result = await ShopService.getAllShops(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Shops retrieved successfully!',
    data: result,
  });
});

const deleteShop = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ShopService.deleteShop(id, req.user as IJwtPayload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Shop deleted successfully!',
    data: result,
  });
});

export const ShopController = {
  createShop,
  getMyShop,
  getAllShops,
  deleteShop,
};