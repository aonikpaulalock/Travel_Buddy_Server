import httpStatus from "http-status";
import { sendResponse } from "../../../shared/sendResponse";
import { tripServices } from "./trip.service";
import { catchAsync } from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { pick } from "../../../shared/pick";
import { tripFilterAbleFields } from "./trip.constant";

const createTripIntoDB = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const { email } = req.user;
  const result = await tripServices.createTripFromDB(req.body, email);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Trip created successfully",
    data: result
  })
})


const getAllTripsIntoDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, tripFilterAbleFields);

  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await tripServices.getAllTripsFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trips retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
})


const sendTravelBuddyRequestIntoDB = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const { tripId } = req.params;
  const { userId } = req.body;

  const result = await tripServices.sendTravelBuddyRequestFromDB(tripId, userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Travel buddy request sent successfully",
    data: result
  })
})

export const tripControllers = {
  createTripIntoDB,
  getAllTripsIntoDB,
  sendTravelBuddyRequestIntoDB
}