import express from 'express';
import { authRoutes } from '../modules/user/user.route';
import { tripRoutes } from '../modules/trip/trip.route';
import { profileRoutes } from '../modules/profile/profile.route';
import { travelBuddieRoutes } from '../modules/travelBuddies/travelBuddies.route';

export const router = express.Router();

const modulerRoutes = [
  {
    path: "/",
    route: authRoutes
  },
  {
    path: "/",
    route: tripRoutes
  },
  {
    path: "/",
    route: profileRoutes,
  },
  {
    path: "/",
    route: travelBuddieRoutes,
  },
]

modulerRoutes.
  forEach(route => router.use(route.path, route.route))

