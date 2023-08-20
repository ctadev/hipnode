import express from "express";
const router = express.Router();

import {
  addCommentLike,
  addLike,
  getCommentLikes,
  getLikes,
  removeCommentLike,
  removeLike,
} from "../controllers/likeController";
import { isAuthenticated } from "../middleware/authMiddleware";

router
  .route("/")
  .get(getLikes)
  .post(isAuthenticated, addLike)
  .delete(isAuthenticated, removeLike);

router
  .route("/comments")
  .get(getCommentLikes)
  .post(isAuthenticated, addCommentLike)
  .delete(isAuthenticated, removeCommentLike);

module.exports = router;
