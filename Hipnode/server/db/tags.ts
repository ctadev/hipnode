import { prisma } from "../server";
import { ITag } from "../types";

// Get all tags
export const getAllTags = async () => {
  return prisma.tag.findMany();
};

// Get tag by id
export const getTagById = async (id: number) => {
  return prisma.tag.findUnique({
    where: {
      id,
    },
  });
};

// Get tag by name
export const getTagByName = async (name: string) => {
  return prisma.tag.findUnique({
    where: {
      name,
    },
  });
};

// Create a new tag
export const createNewTag = async (tag: ITag) => {
  return prisma.tag.create({
    data: tag,
  });
};

// Update tag by id
export const updateTagById = async (id: number, tag: ITag) => {
  return prisma.tag.update({
    where: {
      id,
    },
    data: tag,
  });
};

// Delete tag by id
export const deleteTagById = async (id: number) => {
  return prisma.tag.delete({
    where: {
      id,
    },
  });
};
