import { Response } from "express";

export const sendResponse = <T>(res: Response, jsonData: {
  statusCode: number,
  success: boolean,
  message: string,
  meta?: {
    page: number;
    limit: number;
    total: number;
  },
  data: T
}) => {
  return res.status(jsonData.statusCode).json({
    statusCode: jsonData.statusCode,
    success: jsonData.success,
    message: jsonData.message,
    meta: jsonData.meta || null || undefined,
    data: jsonData.data || null || undefined
  })
}