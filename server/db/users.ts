import {prisma} from "../server";
import { IUser } from "../types/index";


// Get all users
export const getUsers = async () => {
  return prisma.user.findMany();
};

// Get single user
export const getUser = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

// Get user by email
export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// Get user by id
export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

// Create a new user
export const createUser = async (user: IUser) => {
  return prisma.user.create({
    data: user,
  });
};

// Update an existing user
export const updateUserById = async (id: number, user: IUser) => {
  return prisma.user.update({
    where: {
      id,
    },
    data: user,
  });
};

// Delete an existing user
export const deleteUserById = async (id: number) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};

// Get all user followers
export const getUserFollowers = async () => {
  
}