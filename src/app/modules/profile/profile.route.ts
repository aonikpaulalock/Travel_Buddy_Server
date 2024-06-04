import express from "express";
import { userProfileControllers } from "./profile.controller";
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { profileValidation } from "./profile.validation";
const router = express.Router()

router.get(
  '/profile',
  auth(),
  userProfileControllers.getUserProfileIntoDB
);


router.put(
  '/profile',
  auth(),
  validateRequest(profileValidation.profileUpdateSchema),
  userProfileControllers.updateUserProfileIntoDB
);

export const profileRoutes = router;