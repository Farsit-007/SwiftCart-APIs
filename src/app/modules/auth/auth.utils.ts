import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { IJwtPayload } from './auth.interface';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';

export const createToken = (
  jwtPayload: IJwtPayload,
  secret: Secret,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  let decoded;

  try {
    decoded = jwt.verify(token, secret) as JwtPayload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized!');
  }

  return decoded;
};
