import express from "express";
const router = express.Router();

import {
  getPodcasts,
  getPodcast,
  createPodcast,
  updatePodcast,
  deletePodcast,
} from "../controllers/podcastController";
import { isAuthenticated } from "../middleware/authMiddleware";

router.route("/").get(getPodcasts).post(isAuthenticated, createPodcast);

router
  .route("/:podcast_id")
  .get(getPodcast)
  .patch(isAuthenticated, updatePodcast)
  .delete(isAuthenticated, deletePodcast);

module.exports = router;

