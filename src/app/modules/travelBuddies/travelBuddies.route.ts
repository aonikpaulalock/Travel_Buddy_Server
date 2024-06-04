import express from "express";
import { travelBuddieControllers } from "./travelBuddies.controller";
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { tripValidations } from "../trip/trip.validation";
const router = express.Router()

router.get(
  '/travel-buddies/:tripId',
  auth(),
  travelBuddieControllers.getSingleTravelBuddieIntoDB
);

router.put(
  '/travel-buddies/:buddyId/respond',
  auth(),
  validateRequest(tripValidations.updateTravelBuddyRequestStatusValidationSchema),
  travelBuddieControllers.updateStatusTravelBuddieIntoDB
);
export const travelBuddieRoutes = router;