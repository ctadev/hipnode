import express from "express";

import {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUserById,
  getUserFollowers,
} from "../db/users";
import { comparePassword, generateToken, hashPassword } from "../helpers";

// @desc Get users
// @route GET /users
// @access public
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    if (!users.length) {
      return res.status(404).json({ message: "No users found." });
    }
    return res.status(200).json(users);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Create user
// @route POST /users/register
// @access public
export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Registration failed" });
    }

    const user = await createUser({
      username,
      email,
      password: await hashPassword(password),
    });

    if (user) {
      res.status(201).json({
        success: true,
        message: `New user ${user.email} has been created `,
      });
    } else {
      res.status(400).json({ success: false, message: "Registration failed" });
    }
  } catch (err: any) {
    console.error("An error occured during user registration", err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

// @desc Login user
// @route POST /users/login
// @access public
export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const foundUser = await getUserByEmail(email);
    // compare user input password with hashed password stored in database
    const isPasswordMatched = await comparePassword(
      password,
      foundUser?.password ?? ""
    );
    if (!foundUser || !isPasswordMatched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.status(200).json({
      username: foundUser.username,
      email: foundUser.email,
      token: await generateToken(foundUser.id),
      id: foundUser.id,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Get user
// @route GET /users/:id
// @access private
export const getUser = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    return res.status(200).json(req.user);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Get user profile
// @route PATCH /users/profile/:id
// @access public
export const getUserProfile = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID required" });
    }

    const user = await getUserById(parseInt(id));
    if (!user) {
      return res.status(404).json({ message: "No user found." });
    }

    res.status(200).json(user);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Update user
// @route PATCH /users/:id
// @access private
export const updateUser = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { user_id } = req.params;
    const {
      first_name,
      last_name,
      occupation,
      current_stage,
      coding_ability,
      avatar,
      twitter_url,
      website,
      facebook_url,
      instagram_url,
    } = req.body;

    if (
      !user_id ||
      !first_name ||
      !last_name ||
      !occupation ||
      !current_stage ||
      !coding_ability ||
      !avatar
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await getUserById(parseInt(user_id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is authenticated
    if (req.user.id !== user.id) {
      return res.status(403).json({ message: "User is not authorized" });
    }

    const updatedUser = await updateUserById(user.id, {
      ...user,
      first_name,
      last_name,
      occupation,
      current_stage,
      coding_ability,
      avatar,
      instagram_url,
      facebook_url,
      website,
      twitter_url,
    });
    if (!updatedUser) {
      return res.status(400).json({ message: "Invalid user data received" });
    }

    return res.status(200).json(updatedUser);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Get user_followers
// @route GET /userFollowers
// @access public
// export const getAllUserFollowers = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const usersFollowers = await getUserFollowers();
//     if (!usersFollowers.length) {
//       return res.status(404).json({ message: "No users found." });
//     }
//     return res.status(200).json(users);
//   } catch (err: any) {
//     return res
//       .status(500)
//       .json({ message: `An error occurred: ${err.message}` });
//   }
// };
