import mongoose from 'mongoose';
import { IImageFile } from '../../interface/IImageFile';
import { IShop } from './shop.interface';
import { IJwtPayload } from '../auth/auth.interface';
import User from '../user/user.model';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import Shop from './shop.model';

const createShop = async (
  shopData: Partial<IShop>,
  logo: IImageFile,
  authUser: IJwtPayload
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if the user exists and is active
    const existingUser = await User.findById(authUser.userId).session(session);

    if (!existingUser) {
      throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User does not exist!');
    }

    if (!existingUser.isActive) {
      throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User is not active!');
    }

    // Check if user already has a shop
    if (existingUser.hasShop) {
      throw new AppError(StatusCodes.CONFLICT, 'User already has a shop!');
    }

    // Check if a shop already exists for this user (additional safety check)
    const existingShop = await Shop.findOne({ user: existingUser._id }).session(session);
    if (existingShop) {
      throw new AppError(StatusCodes.CONFLICT, 'Shop already exists for this user!');
    }

    if (logo) {
      shopData.logo = logo.path;
    }

    const shop = new Shop({
      ...shopData,
      user: existingUser._id,
    });

    const createdShop = await shop.save({ session });

    // Update user's hasShop flag
    await User.findByIdAndUpdate(
      existingUser._id,
      { hasShop: true },
      { new: true, session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return createdShop;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getMyShop = async (authUser: IJwtPayload) => {
  const existingUser = await User.checkUserExist(authUser.userId);
  if (!existingUser || !existingUser.hasShop) {
    throw new AppError(StatusCodes.NOT_FOUND, 'You have no shop!');
  }

  const shop = await Shop.findOne({ user: existingUser._id }).populate('user');
  return shop;
};

const getAllShops = async (query: Record<string, unknown>) => {
  // Build the query
  const shopQuery = Shop.find().populate('user');

  // Filtering
  if (query?.searchTerm) {
    shopQuery.find({
      $or: [
        { name: { $regex: query.searchTerm, $options: 'i' } },
        { description: { $regex: query.searchTerm, $options: 'i' } }
      ]
    });
  }

  // Sorting
  if (query?.sortBy || query?.sortOrder) {
    const sortOptions: Record<string, 1 | -1> = {};
    sortOptions[query.sortBy as string] = query.sortOrder === 'desc' ? -1 : 1;
    shopQuery.sort(sortOptions);
  }

  // Pagination
  if (query?.page || query?.limit) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    shopQuery.skip(skip).limit(limit);
  }

  const shops = await shopQuery.exec();
  return shops;
};

const deleteShop = async (id: string, authUser: IJwtPayload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the shop with user population
    const shop = await Shop.findOne({ _id: id }).session(session);

    if (!shop) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Shop not found');
    }
    
    // Check permissions
    console.log('shop user', shop.user);
    const isOwner = shop.user?.toString() === authUser.userId;
    
    const isAdmin = authUser.role === 'admin';

    if (!isOwner && !isAdmin) {
      throw new AppError(
        StatusCodes.FORBIDDEN, 
        'You are not authorized to delete this shop'
      );
    }

    // Delete the shop
    const deletedShop = await Shop.findByIdAndDelete(id, { session });

    // Update user's hasShop status if they're the owner
    if (isOwner) {
      await User.findByIdAndUpdate(
        authUser.userId,
        { hasShop: false },
        { new: true, session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    return deletedShop;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
export const ShopService = {
  createShop,
  getMyShop,
  getAllShops,
  deleteShop
};