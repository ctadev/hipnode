import express from "express";
const router = express.Router();

import {
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
} from "../controllers/followController";
import { isAuthenticated } from "../middleware/authMiddleware";

router.route("/:user_id/followers").get(getFollowers);
router.route("/:user_id/following").get(getFollowing);
router.route("/:user_id/follow").post(isAuthenticated, followUser);
router.route("/:user_id/unfollow").delete(isAuthenticated, unfollowUser);

module.exports = router;
