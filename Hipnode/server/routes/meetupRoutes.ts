import express from "express";
const router = express.Router();

import {
  createMeetup,
  deleteMeetup,
  getMeetup,
  getMeetups,
  updateMeetup,
} from "../controllers/meetupController";
import { isAuthenticated } from "../middleware/authMiddleware";

router.route("/").get(getMeetups).post(isAuthenticated, createMeetup);

router
  .route("/:meetup_id")
  .get(getMeetup)
  .patch(isAuthenticated, updateMeetup)
  .delete(isAuthenticated, deleteMeetup);

module.exports = router;
