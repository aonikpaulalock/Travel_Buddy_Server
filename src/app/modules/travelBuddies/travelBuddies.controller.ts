import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { travelBuddiesServices } from "./travelBuddies.service";

const getSingleTravelBuddieIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { tripId } = req.params
  const result = await travelBuddiesServices.getSingleTravelBuddieFromDB(tripId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Potential travel buddies retrieved successfully",
    data: result
  })
})

const updateStatusTravelBuddieIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { buddyId } = req.params;
  const result = await travelBuddiesServices.updateStatusTravelBuddieFromDB(buddyId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Travel buddy request responded successfully",
    data: result
  })
})

export const travelBuddieControllers = {
  getSingleTravelBuddieIntoDB,
  updateStatusTravelBuddieIntoDB
}