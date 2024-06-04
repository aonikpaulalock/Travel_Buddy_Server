import express from "express";
import { tripControllers } from "./trip.controller";
import { auth } from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { tripValidations } from "./trip.validation";
const router = express.Router()

router.get(
  '/trips',
  tripControllers.getAllTripsIntoDB
);

router.post(
  '/trips',
  auth(),
  validateRequest(tripValidations.createTripValidationSchema),
  tripControllers.createTripIntoDB
);

router.post(
  '/trip/:tripId/request',
  auth(),
   validateRequest(tripValidations.createTravelBuddyRequestValidationSchema),
  tripControllers.sendTravelBuddyRequestIntoDB
);

export const tripRoutes = router;