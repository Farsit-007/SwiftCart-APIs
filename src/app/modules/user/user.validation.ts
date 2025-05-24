import { z } from "zod";
import { UserRole } from "./user.interface";

const clientInfoSchema = z.object({
  device: z.enum(["pc", "mobile"]).optional().default("pc"), // Allow only 'pc' or 'mobile'
  browser: z.string().min(1, "Browser name is required"),
  ipAddress: z.string().min(1, "IP address is required"),
  pcName: z.string().optional(), // Optional field
  os: z.string().optional(), // Optional field
  userAgent: z.string().min(1, "User agent is required"),
});
