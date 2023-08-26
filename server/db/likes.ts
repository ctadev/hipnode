import { prisma } from "../server";

export const getAllLikes = async () => {
  try {
    return await prisma.postLikes.findMany();
  } catch (error) {
    console.error(error); // Add this line to log the error
    throw error;
  }
};

export const getAllCommentLikes = async () => {
  try {
    return await prisma.commentLikes.findMany();
  } catch (error) {
    console.error(error); // Add this line to log the error
    throw error;
  }
};
