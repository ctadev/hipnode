import express from 'express';

import {createNotification, getAllNotifications, setNotificationsToRead} from '../db/notifications'

// @desc Get notifications
// @route GET /notifications/
// @access public
export const getNotifications = async (
    req: express.Request | any,
    res: express.Response
  ) => {
    try {
      const notifications = await getAllNotifications();
      if (!notifications.length) {
        return res.status(404).json({ message: "Notifications not found" });
      }
  
      return res.status(200).json(notifications);
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: `An error occured: ${err.message}` });
    }
  };

  export const postNotification = async (
    req: express.Request | any,
    res: express.Response
  ) => {
    const {type, user_id, post_id, comment_id, from_user_id} = req.body;

    if (!type || !user_id) {
      return res.status(400).json({ message: "Missing fields" });
    }

    try {
      const notification = await createNotification(type, user_id, post_id, comment_id, from_user_id);
      if (!notification) {
        return res.status(404).json({ message: "Could not create notification" });
      }
      return res.status(200).json(notification);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: `An error occured: ${error.message}` });
    }
  };

  export const clearNotifications = async (
    req: express.Request | any,
    res: express.Response
  ) => {
    const {user_id} = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "Missing user id" });
    }

    try {
      const notifications = await setNotificationsToRead(user_id);
      if (!notifications) {
        return res.status(404).json({ message: "Could not clear notifications" });
      }
      return res.status(200).json(notifications);
    } catch (error: any) {
      return res.status(500).json({ message: 'Something went wrong' });
    }

  }