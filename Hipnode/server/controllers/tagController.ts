import express from "express";
import {
  createNewTag,
  deleteTagById,
  getTagById,
  getTagByName,
} from "../db/tags";
import { getAllTagsByPostId } from "../db/postTags";

// @desc Get tag
// @route GET /tags/tag_id
// @access public
export const getTag = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { tag_id } = req.params;
    if (!tag_id) {
      return res.status(400).json({ message: "Tag ID Required" });
    }

    const tag = await getTagById(Number(tag_id));
    if (!tag) {
      return res.status(404).json({ message: "No tag found" });
    }
    return res.status(200).json(tag);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

// @desc Get tags
// @route GET /posts/post_id/tags
// @access public
export const getTagsByPostId = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { post_id } = req.params;
    const tags = await getAllTagsByPostId(Number(post_id));
    if (!tags) {
      return res.status(404).json({ message: "No tags found" });
    }
    return res.status(200).json(tags);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

// @desc Create a new tag
// @route POST /tags
// @access public
export const createTag = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Tag name is required" });
    }

    const foundTag = await getTagByName(name);
    if (foundTag) {
      return res.status(409).json({ message: "Tag already exists" });
    }

    const tag = createNewTag({ name });
    if (!tag) {
      return res.status(400).json({ message: "Invalid tag data received" });
    }

    return res.status(201).json(tag);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

// @desc Delete a tag
// @route Delete /tags/:id
// @access public
export const deleteTag = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Tag ID required" });
    }

    const tag = await deleteTagById(parseInt(id));
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    return res
      .status(200)
      .json({ message: `Tag ${tag.name} has been deleted successfully` });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};
