import { NextFunction, Request, Response } from "express";
import { jwtHelpers } from "../../helper/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import ApiError from "../errors/ApiError";

export const auth = () => {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access!")
      }

      const validToken = jwtHelpers.verifyToken(token as string, config.jwt_access_token as Secret);

      if (!validToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized Access!")
      }

      req.user = validToken;
      return next()
    } catch (error) {
      return next(error)
    }
  }
}