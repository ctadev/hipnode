import express from "express";
import {
  createFollower,
  getFollowByFollowerIdAndFollowingId,
  getFollowedUsers,
  getFollowingUsers,
  removeFollower,
} from "../db/follows";
import { getUserById } from "../db/users";

// @desc Get followers by user_id
// @route GET /follows/:id/followers
// @access public
export const getFollowers = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({ message: "User ID required" });
    }

    const followers = await getFollowedUsers(parseInt(user_id));
    if (!followers.length) {
      return res.status(404).json({ message: "Followers not found" });
    }

    return res.status(200).json(followers);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Get following users by user_id
// @route GET /follows/:id/following
// @access public
export const getFollowing = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({ message: "User ID required" });
    }

    const followed = await getFollowingUsers(parseInt(user_id));
    if (!followed.length) {
      return res.status(404).json({ message: "Followers not found" });
    }

    return res.status(200).json(followed);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc follow a user
// @route POST /follows/:id/follow
// @access private
export const followUser = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({ message: "User ID required" });
    }

    const follower = await getUserById(req.user.id);
    const followed = await getUserById(parseInt(user_id));

    if (!follower || !followed) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingFollower = await getFollowByFollowerIdAndFollowingId(
      follower.id,
      followed.id
    );

    if (existingFollower) {
      return res
        .status(400)
        .json(`You have already followed ${followed.username}`);
    }

    const newFollower = await createFollower({
      follower_id: req.user.id,
      following_id: parseInt(user_id),
    });

    if (!newFollower) {
      return res
        .status(400)
        .json({ message: "Invalid follower data received" });
    }

    return res.status(201).json({
      message: `You have followed ${followed.username} successfully`,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Unfollow a user
// @route DELETE /follows/:id/unfollow
// @access private
export const unfollowUser = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({ message: "User ID required" });
    }

    const follower = await getUserById(req.user.id);
    const followed = await getUserById(parseInt(user_id));

    if (!follower || !followed) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingFollower = await getFollowByFollowerIdAndFollowingId(
      follower.id,
      followed.id
    );

    if (!existingFollower) {
      return res
        .status(404)
        .json({ message: `You have not followed ${followed.username} yet` });
    }

    const result = await removeFollower(follower.id, followed.id);
    if (!result) {
      res.status(400).json({
        message: `Invalid follow data received`,
      });
    }

    return res.status(200).json({
      message: `You have unfollowed ${followed.username} successfully`,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};
