import { Document, Model } from 'mongoose';

// Enum for User Roles
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

// User Schema Definition
export interface IUser extends Document {
  email: string;
  password: string;
  passwordChangedAt?: Date;
  name: string;
  profilePhoto?: string;
  role: UserRole;
  hasShop: boolean;
  clientInfo: {
    device: 'pc' | 'mobile';
    browser: string;
    ipAddress: string;
    pcName?: string;
    os?: string;
    userAgent?: string;
  };
  lastLogin: Date;
  isActive: boolean;
  otpToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser | null>;

  checkUserExist(userId: string): Promise<IUser | null>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): Promise<boolean>;
}
