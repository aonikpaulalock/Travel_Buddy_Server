import express from "express";
import { AuthControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";
const router = express.Router()

router.post(
  '/register',
  validateRequest(userValidation.UserCreateSchema),
  AuthControllers.registerIntoDB
);

router.post(
  '/login',
  AuthControllers.loginIntoDB
);

export const authRoutes = router;