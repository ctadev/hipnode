import express from "express";
import {
  createNewComment,
  deleteCommentById,
  getAllCommentsByPostId,
  getCommentById,
  updateCommentById,
} from "../db/comments";

// @desc Get a comment
// @route GET /comments/:post_id
// @access public
export const getCommentsByPost = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const post_id = req.params.post_id;
    if (!post_id) {
      return res.status(400).json({ message: "Post ID required" });
    }

    const comments = await getAllCommentsByPostId(parseInt(post_id));


    return res.status(200).json(comments);
  } catch (err: any) {
    return res.status(500).json({ message: `An error occurred` });
  }
};

// @desc Create a comment
// @route POST /comments
// @access private
export const createComment = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { content, post_id } = req.body;
    if (!content || !post_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const comment = await createNewComment({
      content,
      user_id: req.user.id,
      post_id: parseInt(post_id),
    });

    if (!comment) {
      return res.status(400).json({ message: "Invalid comment data received" });
    }

    return res.status(201).json(comment);
  } catch (err: any) {
    return res.status(500).json({ message: `An error occurred` });
  }
};

// @desc Create a replied comment
// @route POST /comments
// @access private
export const replyComment = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { content } = req.body;

    const { post_id, comment_id } = req.params;
    if (!content || !post_id || !comment_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const replyComment = await createNewComment({
      content,
      user_id: req.user.id,
      post_id: parseInt(post_id),
      reply_id: parseInt(comment_id),
    });

    if (!replyComment) {
      return res.status(400).json({ message: "Invalid comment data received" });
    }

    return res.status(201).json(replyComment);
  } catch (err: any) {
    return res.status(500).json({ message: `An error occurred` });
  }
};

// @desc Update a comment
// @route PATCH /comments/:id
// @access private
export const updateComment = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { post_id, comment_id } = req.params;
    const { content } = req.body;

    if (!content || !post_id || !comment_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const comment = await getCommentById(parseInt(comment_id));
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user is authorized to edit the comment
    if (req.user.id !== comment.user_id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit comment" });
    }

    const updatedComment = await updateCommentById(comment.id, {
      ...comment,
      content,
    });

    if (!updatedComment) {
      return res.status(400).json({ message: "Invalid comment data received" });
    }

    return res.status(200).json(updatedComment);
  } catch (err: any) {
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Delete a comment
// @route DELETE /comments/:id
// @access private
export const deleteComment = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { post_id, comment_id } = req.body;
    if (!post_id || !comment_id) {
      return res.status(400).json({ message: "Post ID or Comment ID missing" });
    }

    const comment = await getCommentById(parseInt(comment_id));
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if user is authorized to delete the comment
    if (req.user.id !== comment.user_id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete comment" });
    }

    const result = await deleteCommentById(comment.id);
    if (!result) {
      return res.status(400).json({ message: "Invalid comment data received" });
    }

    return res.status(200).json({
      message: `Comment has been deleted successfully`,
    });
  } catch (err: any) {
    return res.status(500).json({ message: `An error occured` });
  }
};
