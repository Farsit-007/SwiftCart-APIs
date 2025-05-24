import { Document, Model } from "mongoose";

// Enum for User Roles
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

// User Schema Definition
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  hasShop: boolean;
  clientInfo: {
    device: "pc" | "mobile"; 
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

