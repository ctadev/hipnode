import express from "express";
const router = express.Router();

import {
  registerUser,
  getAllUsers,
  loginUser,
  getUserProfile,
  getUser,
  updateUser,
} from "../controllers/userController";
import { getPostsByUserId } from "../controllers/postController";
import { getPodcastsByUserId } from "../controllers/podcastController";
import { getMeetupsByUserId } from "../controllers/meetupController";

import { isAuthenticated } from "../middleware/authMiddleware";
import { getGroupsByUserId } from "../controllers/groupController";

router.route("/").get(getAllUsers);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:id/profile").get(getUserProfile);
router.route("/:user_id").get(isAuthenticated, getUser);
router.route("/:user_id/update").patch(isAuthenticated, updateUser);
router.route("/:user_id/posts").get(getPostsByUserId);
router.route("/:user_id/podcasts").get(getPodcastsByUserId);
router.route("/:user_id/meetups").get(getMeetupsByUserId);
router.route("/:user_id/groups").get(getGroupsByUserId);

module.exports = router;
