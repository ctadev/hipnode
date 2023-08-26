import express from "express";
import { getTag } from "../controllers/tagController";
const router = express.Router();

router.route("/:tag_id").get(getTag);

module.exports = router;
