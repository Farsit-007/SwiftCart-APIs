import { Router } from "express";
import { AuthController } from "./auth.controller";
import clientInfoParser from "../../middleware/clientInfoParser";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.interface";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();
