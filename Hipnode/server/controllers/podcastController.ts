import express from "express";

import {
  getAllPodcasts,
  getPodcastById,
  createNewPodcast,
  updatePodcastById,
  deletePodcastById,
  getAllPodcastsByUserId,
} from "../db/podcasts";

// @desc Get podcast
// @route GET /podcasts
// @access public
export const getPodcasts = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const podcasts = await getAllPodcasts();
    if (!podcasts.length) {
      return res.status(404).json({ message: "No podcast found" });
    }

    return res.status(200).json(podcasts);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

// @desc Get podcast
// @route GET /podcasts/:id
// @access public
export const getPodcast = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { podcast_id } = req.params;
    if (!podcast_id) {
      return res.status(400).json({ message: "Podcast ID required" });
    }

    const podcast = await getPodcastById(parseInt(podcast_id));
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    return res.status(200).json(podcast);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

// @desc Create podcast
// @route POST /podcasts
// @access private
export const createPodcast = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const {
      title,
      content,
      artist,
      image_url,
      audio_url,
      episode_number,
      is_indie_bites,
      is_software_social,
      is_hipnode,
      is_free,
    } = req.body;
    if (
      !title ||
      !content ||
      !artist ||
      !image_url ||
      !audio_url ||
      !episode_number
    ) {
      return res.status(400).json({ message: "All fields required" });
    }
    const podcast = await createNewPodcast({
      title,
      content,
      artist,
      image_url,
      audio_url,
      episode_number: Number(episode_number),
      is_indie_bites,
      is_software_social,
      is_hipnode,
      is_free,
      user_id: req.user.id,
    });
    if (!podcast) {
      return res.status(400).json({ message: "Invalid data received" });
    }

    return res.status(201).json(podcast);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

// @desc Update podcast
// @route PATCH /podcasts/:id
// @access private
export const updatePodcast = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const {
      title,
      content,
      artist,
      image_url,
      audio_url,
      episode_number,
      is_indie_bites,
      is_software_social,
      is_hipnode,
      is_free,
    } = req.body;
    if (
      !title ||
      !content ||
      !artist ||
      !image_url ||
      !audio_url ||
      !episode_number
    ) {
      return res.status(400).json({ message: "All fields required" });
    }

    const { podcast_id } = req.params;
    if (!podcast_id) {
      return res.status(400).json({ message: "Podcast ID required" });
    }

    const podcast = await getPodcastById(parseInt(podcast_id));
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    // Check if podcast is associated with authorized admin
    if (podcast.user_id !== req.user.id) {
      return res.status(403).json({ message: "User is not authorized admin" });
    }

    const updatedPodcast = await updatePodcastById(podcast.id, {
      ...podcast,
      title,
      content,
      artist,
      episode_number: Number(episode_number),
      image_url,
      audio_url,
      is_indie_bites,
      is_software_social,
      is_hipnode,
      is_free,
    });

    if (!updatedPodcast) {
      return res.status(400).json({ message: "Invalid data received" });
    }

    return res.status(200).json(updatedPodcast);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

// @desc Delete podcast
// @route DELETE /podcasts/:id
// @access private
export const deletePodcast = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { podcast_id } = req.params;
    if (!podcast_id) {
      return res.status(400).json({ message: "Podcast ID required" });
    }

    const podcast = await getPodcastById(parseInt(podcast_id));
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    // Check if podcast is associated with authorized admin
    if (podcast.user_id !== req.user.id) {
      return res.status(403).json({ message: "User is not authorized admin" });
    }

    const result = await deletePodcastById(podcast.id);
    if (!result) {
      return res.status(400).json({ message: "Invalid data received" });
    }

    return res.status(200).json({
      message: `podcast with id: ${result.id} has been deleted successfully`,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};

// @desc Get podcast
// @route GET /user_id/podcasts
// @access private
export const getPodcastsByUserId = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({ message: "User ID required" });
    }

    const podcasts = await getAllPodcastsByUserId(Number(user_id));
    if (!podcasts.length) {
      return res.status(404).json({ message: "podcasts not found" });
    }

    // check if user_id is matched with authenticated user_id or user is authenticated
    // if (Number(user_id) !== req.user.id) {
    //   return res.status(403).json({ message: "User is not authorized" });
    // }

    return res.status(200).json(podcasts);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "An error occured" });
  }
};
