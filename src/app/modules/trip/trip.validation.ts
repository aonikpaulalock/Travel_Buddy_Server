import { z } from "zod";

const statusEnum = z.enum(["PENDING", "APPROVED", "CANCELLED"]).optional();
// Validation schema for creating a trip
const createTripValidationSchema = z.object({
  body: z.object({
    destination: z.string().min(1, "Destination is required"),
    startDate: z.string(),
    endDate: z.string(),
    budget: z.number().min(0, "Budget must be a positive number"),
    activities: z.array(z.string()),
  })
});

const createTravelBuddyRequestValidationSchema = z.object({
  body: z.object({
    userId: z.string().uuid({ message: "Invalid user ID format" }),
  })
});

// Validation schema for updating a travel buddy request status
const updateTravelBuddyRequestStatusValidationSchema = z.object({
  body: z.object({
    status: statusEnum,
  })
});

export const tripValidations = {
  createTripValidationSchema, createTravelBuddyRequestValidationSchema,
  updateTravelBuddyRequestStatusValidationSchema
};