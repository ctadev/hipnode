import { group } from "console";
import { prisma } from "../server";

import { IGroup } from "../types";

export const getAllGroups = async () => {
  return prisma.group.findMany();
};

export const getGroupById = async (id: number) => {
  return prisma.group.findUnique({
    where: {
      id,
    },
  });
};

export const getAllGroupsByUserId = async (id: number) => {
  return prisma.group.findMany({
    where: {
      user_id: id,
    },
  });
};

export const createNewGroup = async (group: IGroup) => {
  return prisma.group.create({
    data: group,
  });
};

export const updateGroupById = async (id: number, group: IGroup) => {
  return prisma.group.update({
    where: {
      id,
    },
    data: group,
  });
};

export const deleteGroupById = async (id: number) => {
  return prisma.group.delete({
    where: {
      id,
    },
  });
};
