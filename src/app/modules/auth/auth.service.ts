import { ClientSession } from "mongoose";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import User from "../user/user.model";
import { IAuth, IJwtPayload } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import mongoose from "mongoose";
import { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateOtp } from "../../utils/generateOtp";
import { EmailHelper } from "../../utils/emailHelper";

const loginUser = async (payload: IAuth) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findOne({ email: payload.email }).session(session);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "This user is not found!");
    }

    if (!user.isActive) {
      throw new AppError(StatusCodes.FORBIDDEN, "This user is not active!");
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(StatusCodes.FORBIDDEN, "Password does not match");
    }

    const jwtPayload: IJwtPayload = {
      userId: user._id as string,
      name: user.name as string,
      email: user.email as string,
      hasShop: user.hasShop,
      isActive: user.isActive,
      role: user.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string
    );

    const updateUserInfo = await User.findByIdAndUpdate(
      user._id,
      { clientInfo: payload.clientInfo, lastLogin: Date.now() },
      { new: true, session }
    );

    await session.commitTransaction();

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};



