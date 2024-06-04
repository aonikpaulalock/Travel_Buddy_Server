import { prisma } from "../../../shared/prisma";

const getSingleTravelBuddieFromDB = async (tripId: string) => {
  const result = await prisma.travelBuddyRequest.findMany({
    where: {
      tripId
    },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });

  return result
}
const updateStatusTravelBuddieFromDB = async (buddyId: string, payload: any) => {

  const result = await prisma.travelBuddyRequest.update({
    where: { id: buddyId },
    data: { status: payload.status }
  });

  return result
}

export const travelBuddiesServices = {
  getSingleTravelBuddieFromDB,
  updateStatusTravelBuddieFromDB
}