import { User } from "@prisma/client";
import prisma from "../../../constants/prisma";
import { IRefreshTokenResponse, ISignIn, ISignInResponse } from "./interface";
import ApiError from "../../../errors/ApiError";
import { createToken, verifyToken } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const signUp = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data });

  return result;
};

const signIn = async ({
  email,
  password,
}: ISignIn): Promise<ISignInResponse> => {
  const isUserExist = await prisma.user.findFirst({
    where: { email, password },
  });

  if (!isUserExist) throw new ApiError(404, "User not found !");

  const { id: userId, role } = isUserExist;

  const accessToken = createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;

  try {
    verifiedToken = verifyToken(token, config.jwt.refresh_secret as Secret);
  } catch (err) {
    throw new ApiError(403, "Invalid refresh token !");
  }

  const { id } = verifiedToken;

  const isUserExist = await prisma.user.findFirst({ where: { id } });

  if (!isUserExist) throw new ApiError(404, "User not found !");

  const newAccessToken = createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken: newAccessToken };
};

export const AuthService = { signUp, signIn, refreshToken };
