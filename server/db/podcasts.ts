import { prisma } from "../server";
import { IPodcast } from "../types";


export const getAllPodcasts = async () => {
  return prisma.podcast.findMany();
};

export const getPodcastById = async (id: number) => {
  return prisma.podcast.findUnique({
    where: {
      id,
    },
  });
};

export const createNewPodcast = async (podcast: IPodcast) => {
  return prisma.podcast.create({
    data: podcast,
  });
};

export const updatePodcastById = async (id: number, podcast: IPodcast) => {
  return prisma.podcast.update({
    where: {
      id,
    },
    data: podcast,
  });
};

export const deletePodcastById = async (id: number) => {
  return prisma.podcast.delete({
    where: {
      id,
    },
  });
};

// get all posts by user id
export const getAllPodcastsByUserId = async (id: number) => {
  return prisma.podcast.findMany({
    where: {
      user_id: id,
    },
  });
};
