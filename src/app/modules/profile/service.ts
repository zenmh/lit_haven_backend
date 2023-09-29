import { User } from "@prisma/client";
import prisma from "../../../constants/prisma";

const getProfile = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findFirst({ where: { id } });

  return result;
};

export const ProfileService = { getProfile };
