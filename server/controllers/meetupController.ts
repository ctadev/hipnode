import express from "express";
import {
  createNewMeetup,
  deleteMeetupById,
  getAllMeetups,
  getMeetupById,
  updateMeetupById,
  getAllMeetupsByUserId,
} from "../db/meetups";

// @desc Get meetups
// @route GET /meetups
// @access public
export const getMeetups = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const meetups = await getAllMeetups();
    if (!meetups.length) {
      return res.status(404).json({ message: "No meetups found" });
    }

    return res.status(200).json(meetups);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Get meetup
// @route GET /meetups/:id
// @access public
export const getMeetup = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { meetup_id } = req.params;
    if (!meetup_id) {
      return res.status(400).json({ message: "Meetup ID required" });
    }

    const meetup = await getMeetupById(parseInt(meetup_id));
    if (!meetup) {
      return res.status(404).json({ message: "Meetup not found" });
    }

    return res.status(200).json(meetup);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Create meetup
// @route POST /meetups
// @access private
export const createMeetup = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const {
      name,
      content,
      location,
      date,
      image_url,
      is_fulltime,
      is_parttime,
      is_internship,
      is_remote,
      is_contract,
      is_free,
    } = req.body;

    if (!name || !content || !location || !image_url || !date) {
      return res.status(400).json({ message: "All fields required" });
    }

    const meetup = await createNewMeetup({
      name,
      content,
      image_url,
      location,
      date,
      is_fulltime,
      is_parttime,
      is_internship,
      is_remote,
      is_contract,
      is_free,
      user_id: req.user.id,
    });
    if (!meetup) {
      return res.status(400).json({ message: "Invalid data received" });
    }

    return res.status(201).json(meetup);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Update meetup
// @route PATCH /meetups/:id
// @access private
export const updateMeetup = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const {
      name,
      content,
      location,
      date,
      image_url,
      is_fulltime,
      is_parttime,
      is_internship,
      is_remote,
      is_contract,
      is_free,
    } = req.body;
    if (!name || !content || !location || !date || !image_url) {
      return res.status(400).json({ message: "All fields required" });
    }

    const { meetup_id } = req.params;
    if (!meetup_id) {
      return res.status(400).json({ message: "Meetup ID required" });
    }

    const meetup = await getMeetupById(parseInt(meetup_id));
    if (!meetup) {
      return res.status(404).json({ message: "Meetup not found" });
    }

    // Check if meetup is associated with authorized admin
    if (meetup.user_id !== req.user.id) {
      return res.status(403).json({ message: "User is not authorized admin" });
    }

    const updatedMeetup = await updateMeetupById(meetup.id, {
      ...meetup,
      name,
      content,
      image_url,
      location,
      date,
      is_fulltime,
      is_parttime,
      is_internship,
      is_remote,
      is_contract,
      is_free,
    });

    if (!updatedMeetup) {
      return res.status(400).json({ message: "Invalid data received" });
    }

    return res.status(200).json(updatedMeetup);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Delete meetup
// @route DELETE /meetups/:id
// @access private
export const deleteMeetup = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { meetup_id } = req.params;
    if (!meetup_id) {
      return res.status(400).json({ message: "Meetup ID required" });
    }

    const meetup = await getMeetupById(parseInt(meetup_id));
    if (!meetup) {
      return res.status(404).json({ message: "Meetup not found" });
    }

    // Check if meetup is associated with authorized admin
    if (meetup.user_id !== req.user.id) {
      return res.status(403).json({ message: "User is not authorized admin" });
    }

    const result = await deleteMeetupById(meetup.id);
    if (!result) {
      return res.status(400).json({ message: "Invalid data received" });
    }

    return res.status(200).json({
      message: `meetup with id: ${result.id} has been deleted successfully`,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};

// @desc Get podcast
// @route GET /user_id/meetups
// @access private
export const getMeetupsByUserId = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({ message: "User ID required" });
    }

    const podcasts = await getAllMeetupsByUserId(Number(user_id));
    if (!podcasts.length) {
      return res.status(404).json({ message: "meetups not found" });
    }

    // check if user_id is matched with authenticated user_id or user is authenticated
    // if (Number(user_id) !== req.user.id) {
    //   return res.status(403).json({ message: "User is not authorized" });
    // }

    return res.status(200).json(podcasts);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: `An error occured` });
  }
};
