import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError, ZodIssue } from "zod";

export const globalError = (err: any, req: Request, res: Response, next: NextFunction) => {

  let statusCode = 500;
  let message = err.message || "Something went wrong";
  let errorDetails = err;

  if (err instanceof ZodError) {
    const concatedMessage = err.issues.map((issue, index) => {
      if (index === err.issues.length - 1) {
        return issue.message;
      } else {
        return issue.message + ".";
      }
    });
    message = concatedMessage.join(" ") + ".";
    errorDetails = {
      issues: err.issues.map((issue) => ({
        field: issue.path[1],
        message: issue.message,
      })),
    }
  }
  else if (err instanceof JsonWebTokenError) {
    statusCode = 401;
    message = 'Unauthorized Access';
    errorDetails = err
  }

  return res.status(statusCode)
    .json({
      success: false,
      message,
      errorDetails
    })
}