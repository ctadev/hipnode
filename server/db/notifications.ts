import { prisma } from '../server';

export const getAllNotifications = async () => {
  return prisma.notification.findMany();
};

export const createNotification = async (type: string, user_id: number, post_id: number, comment_id?: number, from_user_id?: number) => {
  return prisma.notification.create({
    data: {
      type,
      userId: user_id,
      postId: post_id,
      commentId: comment_id,
      fromUserId: from_user_id
    }
  });
}

export const setNotificationsToRead = async (user_id: number) => {
  return prisma.notification.updateMany({
    where: {
      userId: user_id
    },
    data: {
      isRead: true
    }
  });
}