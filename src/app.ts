import cors from "cors";
import express, { Application, Request, Response, NextFunction } from 'express';
import httpStatus from "http-status";
import { globalError } from "./app/middleware/globalError";
import { notFound } from "./app/middleware/notFound";
import cookieParser from 'cookie-parser'
import { authRoutes } from "./app/modules/user/user.route";
import { tripRoutes } from "./app/modules/trip/trip.route";
import { travelBuddieRoutes } from "./app/modules/travelBuddies/travelBuddies.route";
import { profileRoutes } from "./app/modules/profile/profile.route";
import { router } from "./app/routes";
const app: Application = express()

//! Parser
app.use(cors())
app.use(express.json())
app.use(cookieParser())

//! Testing Url
app.get("", (req, res) => {
  res.send({
    message: "successfuly testing"
  })
})

//! Using Middleware
app.use("/api", router)
//! Global Error Handeler Middleware
app.use(globalError)
//! Not found route middleware
app.use(notFound)


export default app



