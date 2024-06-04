import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { userProfileServices } from "./profile.service";

const getUserProfileIntoDB = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.user;
  const result = await userProfileServices.getUserProfileFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result
  })
})

const updateUserProfileIntoDB = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const { id } = req.user;
  const result = await userProfileServices.updateUserProfileFromDB(id,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result
  })
})

export const userProfileControllers = {
  getUserProfileIntoDB,
  updateUserProfileIntoDB
}
