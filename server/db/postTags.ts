import { prisma } from "../server";
import { IPostTag } from "../types";

// get all posttags
export const getAllPostTagsDB = async () => {
  return prisma.postTag.findMany();
};

// get all posttags by post_id and tag_id
export const getPostTagByPostIdAndTagId = async (
  post_id: number,
  tag_id: number
) => {
  return prisma.postTag.findUnique({
    where: {
      post_id_tag_id: {
        post_id,
        tag_id,
      },
    },
  });
};

// Get all posts by tag id
export const getAllPostsByTagId = async (id: number) => {
  return prisma.postTag.findMany({
    where: {
      tag_id: id,
    },
  });
};

// Get all tags by post id
export const getAllTagsByPostId = async (id: number) => {
  return prisma.postTag.findMany({
    where: {
      post_id: id,
    },
  });
};

// Create a new posttag
export const createNewPostTag = async (postTag: IPostTag) => {
  return prisma.postTag.create({
    data: postTag,
  });
};

// Delete a posttag by tag_id and post_id
export const deletePostTag = async (post_id: number, tag_id: number) => {
  return prisma.postTag.delete({
    where: {
      post_id_tag_id: {
        post_id,
        tag_id,
      },
    },
  });
};
