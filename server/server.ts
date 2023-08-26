import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import uploadMiddleware, {
  handleImageUpload,
} from "./middleware/uploadMiddleware";
dotenv.config();
import { PrismaClient } from "@prisma/client";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/users", require("./routes/userRoutes"));
app.use("/posts", require("./routes/postRoutes"));
app.use("/groups", require("./routes/groupRoutes"));
app.use("/meetups", require("./routes/meetupRoutes"));
app.use("/podcasts", require("./routes/podcastRoutes"));
app.use("/reports", require("./routes/reportRoutes"));
app.use("/follows", require("./routes/followRoutes"));
app.use("/comments", require("./routes/commentRoutes"));
app.use("/tags", require("./routes/tagRoutes"));
app.use("/likes", require("./routes/likeRoutes"));
app.use("/notifications", require("./routes/notificationRoutes"));

app.post("/upload", uploadMiddleware, handleImageUpload);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

export const prisma = new PrismaClient();
