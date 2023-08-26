import express from "express";

import {
  createNewGroup,
  deleteGroupById,
  getAllGroups,
  getAllGroupsByUserId,
  getGroupById,
  updateGroupById,
} from "../db/groups";

import {
  createUserGroup,
  deleteUserGroupByUserIdAndGroupId,
  getUserGroupByUserIdAndGroupId,
  getUserGroupsByGroupId,
} from "../db/userGroups";

import { getUser } from "../db/users";
import { IGroup, IUserGroup } from "../types";

// @desc Get groups
// @route GET /groups
// @access private
export const getGroups = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const groups = await getAllGroups();

    if (!groups.length) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(groups);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Get group
// route GET /groups/:id
// @access private
export const getGroup = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { group_id } = req.params;
    if (!group_id) {
      return res.status(400).json({ message: "Group ID required" });
    }

    const group = await getGroupById(parseInt(group_id));
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if group is associated with authorized admin
    // if (group.user_id !== req.user.id) {
    //   return res.status(403).json({ message: "User is not authorized admin" });
    // }

    const updatedGroup = await updateGroupById(group.id, {
      ...group,
      view_count: (group.view_count ?? 0) + 1,
    });

    return res.status(200).json(updatedGroup);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Create group
// @route POST /groups
// @access private
export const createGroup = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { name, about, description, image_url, logo_url } = req.body;

    if (!name || !about || !description || !image_url || !logo_url) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const group = await createNewGroup({
      name,
      about,
      description,
      image_url,
      logo_url,
      user_id: req.user.id,
    });

    if (!group) {
      return res.status(400).json({ message: "Invalid data received" });
    }

    const userGroup = await createUserGroup({
      user_id: group.user_id,
      group_id: group.id,
      is_admin: true,
    });

    if (!userGroup) {
      return res.status(400).json({ message: "Invalid data received" });
    }

    return res
      .status(201)
      .json({ message: `Group ${group.name} created successfully` });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

// @desc Update group
// @route PATCH /groups/:id
// @access private
export const updateGroup = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { name, about, description, image_url, logo_url } = req.body;
    if (!name || !about || !description || !image_url || !logo_url) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { group_id } = req.params;
    if (!group_id) {
      return res.status(400).json({ message: "Group ID required" });
    }

    const group = await getGroupById(parseInt(group_id));
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if group is associated with authorized admin
    if (group.user_id !== req.user.id) {
      return res.status(403).json({ message: "User is not authorized admin" });
    }

    const updatedGroup = await updateGroupById(group.id, {
      ...group,
      name,
      about,
      description,
      image_url,
      logo_url,
    });

    if (!updatedGroup) {
      res.status(400).json({ message: "Invalid data received" });
    }

    return res.status(200).json(updatedGroup);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Delete group
// @route DELETE /groups/:id
// @access private
export const deleteGroup = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { group_id } = req.params;
    if (!group_id) {
      return res.status(400).json({ message: "Group ID required" });
    }

    const group = await getGroupById(parseInt(group_id));
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if group is associated with authorized admin
    if (group.user_id !== req.user.id) {
      return res.status(403).json({ message: "User is not authorized admin" });
    }

    const result = await deleteGroupById(group.id);
    if (!result) {
      return res.status(400).json({ message: "Invalid data received" });
    }

    return res.status(200).json(`Group with id: ${result.id} has been deleted`);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Join group
// @route POST /groups/:id/join
// @access private
export const joinUserGroup = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { group_id } = req.params;
    if (!group_id) {
      return res.status(400).json({ message: "Group ID required" });
    }
    const userGroupObj = {
      user_id: req.user.id,
      group_id: parseInt(group_id),
    };

    const userGroup = await createUserGroup(userGroupObj);
    if (!userGroup) {
      return res.status(400).json({ message: "Invalid data received" });
    }

    const group = await getGroupById(parseInt(group_id));
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const updatedGroup = await updateGroupById(parseInt(group_id), {
      ...group,
      member_count: (group.member_count ?? 1) + 1,
    });

    if (!updatedGroup) {
      return res.status(400).json({ message: "Invalid data received" });
    }

    return res.status(201).json({
      message: `User with id: ${userGroup.user_id} has joined ${userGroup.group_id} sucessfully`,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

// @desc Leave group
// @route DELETE /groups/:id/leave
// @access private
export const leaveUserGroup = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { group_id } = req.params;
    if (!group_id) {
      return res.status(400).json({ message: "Group ID required" });
    }

    const userGroup = await deleteUserGroupByUserIdAndGroupId(
      req.user.id,
      parseInt(group_id)
    );
    if (!userGroup) {
      return res.status(400).json({ message: "Invalid data received" });
    }

    return res.status(200).json({
      message: `User with id: ${userGroup.user_id} has left ${userGroup.group_id} sucessfully`,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc check if user is in group
// @route GET /groups/:group_id/isMember
// @access public
export const isGroupMember = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { group_id } = req.params;
    const { user_id } = req.query;

    if (!user_id || !group_id) {
      return res
        .status(400)
        .json({ message: "User Id and Group Id are required" });
    }
    const userGroup = await getUserGroupByUserIdAndGroupId(
      parseInt(user_id),
      parseInt(group_id)
    );

    if (!userGroup) {
      return res.status(404).json({ isMember: false });
    }

    return res.status(200).json({ isMember: true });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

// @desc get group admin
// @route GET /groups/:group_id/admin
// @access public
export const getGroupAdmin = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { group_id } = req.params;
    if (!group_id) {
      return res.status(400).json({ message: "Group Id required" });
    }

    const group = await getGroupById(parseInt(group_id));
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const user = await getUser(group.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

// @desc get members of the group
// @route GET /groups/:group_id/members
// @access public
export const getGroupMembers = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { group_id } = req.params;

    if (!group_id) {
      return res.status(400).json({ message: "Group Id required" });
    }

    const userGroups = await getUserGroupsByGroupId(parseInt(group_id));

    if (!userGroups) {
      return res.status(404).json({ message: "Group not found" });
    }

    const users = await Promise.all(
      userGroups.map((userGroup: IUserGroup) => getUser(userGroup.user_id))
    );

    return res.status(200).json(users);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

export const getGroupsByUserId = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({ message: "User ID required" });
    }

    const groups: IGroup[] = await getAllGroupsByUserId(Number(user_id));
    if (!groups) {
      return res.status(404).json({ message: "Groups not found" });
    }

    // // Check if user is authorized to access resources
    // if (Number(user_id) !== req.user.id) {
    //   return res.status(403).json({ message: "User is not authorized admin" });
    // }

    return res.status(200).json(groups);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};
