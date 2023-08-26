import { Prisma } from "@prisma/client";
import { prisma } from "../server";

import { IComment } from "../types";

type ICommentUpdate = Prisma.CommentUpdateInput;
type ICommentCreate = Prisma.CommentCreateInput;

// Get comments by post_id
export const getAllCommentsByPostId = async (post_id: number) => {
  return prisma.comment.findMany({
    where: {
      post_id,
    },
  });
};

// Get comments by id
export const getCommentById = async (id: number) => {
  return prisma.comment.findUnique({
    where: {
      id,
    },
  });
};

// Create a new comment
export const createNewComment = async ({
  content,
  user_id,
  post_id,
}: Partial<IComment>) => {
  return prisma.comment.create({
    data: {
      content: content!,
      user_id: user_id!,
      post_id: post_id!,
    },
  });
};

// Update comment by id
export const updateCommentById = async (
  id: number,
  comment: Prisma.CommentUpdateInput
) => {
  return prisma.comment.update({
    where: {
      id,
    },
    data: comment,
  });
};

// Delete a comment by id
export const deleteCommentById = async (id: number) => {
  return prisma.comment.delete({
    where: {
      id,
    },
  });
};
