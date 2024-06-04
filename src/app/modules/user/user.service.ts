import bcrypt from "bcrypt"
import { prisma } from "../../../shared/prisma";
import { jwtHelpers } from "../../../helper/jwtHelper";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
const registerUserFromDB = async (payload:any) => {
  const { name, email, password, profile } = payload;
  const hashedPassword: string = await bcrypt.hash(password, 12)

  const userData = {
    name,
    email,
    password: hashedPassword,
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    const createUser = await transactionClient.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    await transactionClient.userProfile.create({
      data: {
        ...profile,
        user: { connect: { id: createUser.id } }
      }
    });

    return createUser;
  });

  return result;
};

const loginFromDB = async (payload: {
  email: string,
  password: string
}) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    }
  });

  const { id, name, email } = userData;

  const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!")
  }
  const token = jwtHelpers.generateToken({
    id: userData.id,
    email: userData.email,
  },
    config.jwt_access_token as Secret,
    config.jwt_access_token_expireIn as string
  );

  return {
    id,
    name,
    email,
    token
  };
};

export const AuthServices = {
  registerUserFromDB,
  loginFromDB
}