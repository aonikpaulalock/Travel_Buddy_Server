import httpStatus from "http-status";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { AuthServices } from "./user.service";

const registerIntoDB = catchAsync(async (req: Request, res: Response) => {

  const result = await AuthServices.registerUserFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result
  })
})

const loginIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginFromDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result
  })
});

export const AuthControllers = {
  registerIntoDB,
  loginIntoDB
}