import { Prisma } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { TPaginationOption, TTripFilter } from "./trip.interface";

const createTripFromDB = async (payload: any, email: string) => {
  const {
    startDate,
    endDate
  } = payload;

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email
    }
  })

  const createUser = await prisma.trip.create({
    data: {
      ...payload,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      userId: userData.id
    }
  })
  return createUser
};

const getAllTripsFromDB = async (
  params: TTripFilter,
  options: TPaginationOption
) => {
  // Calculate pagination parameters
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;

  // Destructure filter parameters
  const { searchTerm, ...filterData } = params;

  // Define searchable fields
  const searchableFields = ["destination"];

  // Build where conditions based on filter parameters
  const whereConditions: Prisma.TripWhereInput = {};

  // Handle search term condition
  if (searchTerm) {
    whereConditions.OR = searchableFields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    }));
    
    // Also search by budget if it's a number
    const searchTermAsNumber = parseFloat(searchTerm);
    if (!isNaN(searchTermAsNumber)) {
      whereConditions.OR.push({
        budget: searchTermAsNumber,
      });
    }
  }

  // Handle budget filter
  if (filterData.budget && (filterData.budget.minBudget || filterData.budget.maxBudget)) {
    whereConditions.budget = {
      gte: filterData.budget.minBudget || 0,
      lte: filterData.budget.maxBudget || Number.MAX_SAFE_INTEGER,
    };
  }

  // Build filter conditions for non-search filters
  if (Object.keys(filterData).length > 0) {
    if (filterData.destination) {
      whereConditions.destination = {
        contains: filterData.destination,
      };
    }

    if (filterData.startDate) {
      whereConditions.startDate = {
        gte: new Date(filterData.startDate).toISOString(),
      };
    }

    if (filterData.endDate) {
      whereConditions.endDate = {
        lte: new Date(filterData.endDate).toISOString(),
      };
    }
  }

  // Retrieve paginated and filtered trips
  const result = await prisma.trip.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [options.sortBy || "createdAt"]: options.sortOrder || "desc",
    },
  });

  // Get total count of filtered trips
  const total = await prisma.trip.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};


const sendTravelBuddyRequestFromDB = async (tripId: string, userId: string) => {
  const travelBuddyRequest = await prisma.travelBuddyRequest.create({
    data: {
      trip: { connect: { id: tripId } },
      user: { connect: { id: userId } }
    }
  });

  return travelBuddyRequest
};

export const tripServices = {
  createTripFromDB,
  getAllTripsFromDB,
  sendTravelBuddyRequestFromDB
}