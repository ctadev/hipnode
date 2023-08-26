import express from "express";
const router = express.Router();

import {
  getCommentsByPost,
  createComment,
} from "../controllers/commentController";
import { isAuthenticated } from "../middleware/authMiddleware";

router
  .route("/:post_id")
  .get(getCommentsByPost)
  .post(isAuthenticated, createComment);
module.exports = router;
