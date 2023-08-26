import express from "express";

import { getAllCommentLikes, getAllLikes } from "../db/likes";
import { prisma } from "../server";

// @desc Get likes
// @route GET /likes/
// @access public
export const getLikes = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const likes = await getAllLikes();
    if (!likes.length) {
      return res.status(404).json({ message: "No likes currently" });
    }
    return res.status(200).json(likes);
  } catch (err: any) {
    return res.status(500).json({ message: `An error occured` });
  }
};

export const addLike = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { post_id, user_id } = req.body;
    const like = await prisma.postLikes.create({
      data: {
        post_id: post_id,
        user_id: user_id,
      },
    });
    if (!like) {
      return res.status(404).json({ message: "Could not like post" });
    } else {
      return res.status(200).json({ message: "Like added" });
    }
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: `An error occured: ${err.message}` });
  }
};

export const removeLike = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { post_id, user_id } = req.body;
    const like = await prisma.postLikes.delete({
      where: {
        user_id_post_id: {
          user_id: user_id,
          post_id: post_id,
        },
      },
    });
    if (!like) {
      return res.status(404).json({ message: "Could not unlike post" });
    } else {
      return res.status(200).json({ message: "Like removed" });
    }
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: `An error occured: ${err.message}` });
  }
};

export const getCommentLikes = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const likes = await getAllCommentLikes();
    if (!likes.length) {
      return res.status(404).json({ message: "No likes currently" });
    }
    return res.status(200).json(likes);
  } catch {
    return res.status(500).json({ message: `An error occured` });
  }
};

export const addCommentLike = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { comment_id, user_id } = req.body;
    const like = await prisma.commentLikes.create({
      data: {
        comment_id: comment_id,
        user_id: user_id,
      },
    });
    if (!like) {
      return res.status(404).json({ message: "Could not like comment" });
    } else {
      return res.status(200).json({ message: "Like added" });
    }
  } catch {
    return res.status(500).json({ message: `An error occured` });
  }
};

export const removeCommentLike = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { comment_id, user_id } = req.body;
    const like = await prisma.commentLikes.delete({
      where: {
        user_id_comment_id: {
          user_id: user_id,
          comment_id: comment_id,
        },
      },
    });
    if (!like) {
      return res.status(404).json({ message: "Could not unlike comment" });
    } else {
      return res.status(200).json({ message: "Like removed" });
    }
  } catch {
    return res.status(500).json({ message: `An error occured` });
  }
};
