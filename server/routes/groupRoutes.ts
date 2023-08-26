import express from "express";
const router = express.Router();

import {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  joinUserGroup,
  leaveUserGroup,
  isGroupMember,
  getGroupAdmin,
  getGroupMembers,
} from "../controllers/groupController";
import { createPost, getPosts } from "../controllers/postController";
import { isAuthenticated } from "../middleware/authMiddleware";

router.route("/").get(getGroups).post(isAuthenticated, createGroup);
router
  .route("/:group_id")
  .get(getGroup)
  .patch(isAuthenticated, updateGroup)
  .delete(isAuthenticated, deleteGroup);
router
  .route("/:group_id/posts")
  .get(getPosts)
  .post(isAuthenticated, createPost);
router.route("/:group_id/join").post(isAuthenticated, joinUserGroup);
router.route("/:group_id/leave").delete(isAuthenticated, leaveUserGroup);
router.route("/:group_id/isMember").get(isGroupMember);
router.route("/:group_id/admin").get(getGroupAdmin);
router.route("/:group_id/members").get(getGroupMembers);

module.exports = router;
