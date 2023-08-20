import { prisma } from "../server";

import { IFollow } from "../types";

// Get followed users by user_id
export const getFollowedUsers = async (user_id: number) => {
  return prisma.follows.findMany({
    where: {
      following_id: user_id,
    },
  });
};

// Get following users by user_id
export const getFollowingUsers = async (user_id: number) => {
  return prisma.follows.findMany({
    where: {
      follower_id: user_id,
    },
  });
};

// get follow record by follower_id and following_id
export const getFollowByFollowerIdAndFollowingId = async (
  follower_id: number,
  following_id: number
) => {
  return prisma.follows.findUnique({
    where: {
      follower_id_following_id: {
        follower_id,
        following_id,
      },
    },
  });
};

// create a new follow record
export const createFollower = async (follow: IFollow) => {
  return prisma.follows.create({ data: follow });
};

// delete an existing follow record
export const removeFollower = async (
  follower_id: number,
  following_id: number
) => {
  return prisma.follows.delete({
    where: {
      follower_id_following_id: {
        follower_id,
        following_id,
      },
    },
  });
};
