import { prisma } from "../server";

import { IMeetup } from "../types";

export const getAllMeetups = async () => {
  return prisma.meetup.findMany();
};

export const getMeetupById = async (id: number) => {
  return prisma.meetup.findUnique({
    where: {
      id,
    },
  });
};

export const createNewMeetup = async (meetup: IMeetup) => {
  return prisma.meetup.create({
    data: meetup,
  });
};

export const updateMeetupById = async (id: number, meetup: IMeetup) => {
  return prisma.meetup.update({
    where: {
      id,
    },
    data: meetup,
  });
};

export const deleteMeetupById = async (id: number) => {
  return prisma.meetup.delete({
    where: {
      id,
    },
  });
};

// get all meetups by user id
export const getAllMeetupsByUserId = async (id: number) => {
  return prisma.meetup.findMany({
    where: {
      user_id: id,
    },
  });
};
