import express from "express";
const router = express.Router();

import {
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/postController";
import { isAuthenticated } from "../middleware/authMiddleware";
import {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentController";
import { getTagsByPostId } from "../controllers/tagController";

router.route("/").get(getPosts);

router
  .route("/:post_id")
  .get(getPost)
  .patch(isAuthenticated, updatePost)
  .delete(isAuthenticated, deletePost);

router.route("/:post_id/tags").get(getTagsByPostId);

router
  .route("/:post_id/comments")
  .get(getCommentsByPost)
  .post(isAuthenticated, createComment);

router
  .route("/:post_id/comments/:comment_id")
  .patch(isAuthenticated, updateComment)
  .delete(isAuthenticated, deleteComment);

router
  .route("/:post_id/comments/:comment_id/replies")
  .post(isAuthenticated, createComment);

module.exports = router;
