import { User, UserProfile } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

const getUserProfileFromDB = async (userId: string) => {
  const result = await prisma.userProfile.findUniqueOrThrow({
    where: { userId },
    select: {
      id: true,
      user: {
        select: {
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true
        }
      }
    }
  });

  const userData = {
    id: result.id,
    name: result.user.name,
    email: result.user.email,
    createdAt: result.user.createdAt,
    updatedAt: result.user.updatedAt
  };

  return userData
};
const updateUserProfileFromDB = async (userId: string, payload: any) => {
  const { name, email } = payload;
  const result = await prisma.userProfile.update({
    where: { userId },
    data: {
      user: {
        update: {
          name,
          email
        }
      }
    },
    include: {
      user: true
    }
  });

  const updatedData = {
    id: result.id,
    name: result.user.name,
    email: result.user.email,
    createdAt: result.user.createdAt,
    updatedAt: result.user.updatedAt
  }

  return updatedData
};



export const userProfileServices = {
  getUserProfileFromDB,
  updateUserProfileFromDB
}
