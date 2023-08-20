import { prisma } from "../server";
import { IUserGroup } from "../types";

// get usergroup by user_id and group_id
export const getUserGroupByUserIdAndGroupId = async (
  user_id: number,
  group_id: number
) => {
  return prisma.userGroup.findUnique({
    where: {
      user_id_group_id: {
        user_id,
        group_id,
      },
    },
  });
};

// get users by group_id
export const getUserGroupsByGroupId = async (id: number) => {
  return prisma.userGroup.findMany({
    where: {
      group_id: id,
    },
  });
};

// get groups by user_id
export const getGroupsByUserId = async (id: number) => {
  return prisma.userGroup.findMany({
    where: {
      user_id: id,
    },
  });
};

// create new usergroup
export const createUserGroup = async (userGroup: IUserGroup) => {
  return prisma.userGroup.create({
    data: userGroup,
  });
};

// delete usergroup by user_id and group_id
export const deleteUserGroupByUserIdAndGroupId = async (
  user_id: number,
  group_id: number
) => {
  return prisma.userGroup.delete({
    where: {
      user_id_group_id: {
        user_id,
        group_id,
      },
    },
  });
};
