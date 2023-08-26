import { prisma } from "../server";
import { IPost } from "../types";

// get all posts
export const getAllPosts = async () => {
  return prisma.post.findMany();
};

// get all posts by user id
export const getAllPostsByUserId = async (id: number) => {
  return prisma.post.findMany({
    where: {
      user_id: id,
    },
  });
};

// get posts by group id
export const getAllPostsByGroupId = async (id: number) => {
  return prisma.post.findMany({
    where: {
      group_id: id,
    },
  });
};

// get post by id
export const getPostById = async (id: number) => {
  return prisma.post.findUnique({
    where: {
      id,
    },
  });
};

// set post
export const createNewPost = async (post: IPost) => {
  return prisma.post.create({
    data: post,
  });
};

// edit post
export const updatePostById = async (id: number, post: IPost) => {
  return prisma.post.update({
    where: {
      id,
    },
    data: post,
  });
};

// delete post
export const deletePostById = async (id: number) => {
  return prisma.post.delete({
    where: {
      id,
    },
  });
};

// post pagination
const pagination = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;

  const result = await prisma.post.findMany({
    skip,
    take: pageSize,
  });

  return result;
};
