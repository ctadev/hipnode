import React, { useEffect, useState } from "react";

import { IComment, INotification, IPost, IUser } from "../../types/index";
import { useGetComments, useGetPost } from "../../hooks/usePosts";
import { useGetUsers } from "../../hooks/useUsers";
import { UserAvatar, comment, edit, like } from '../assets/index'
import { formatDate } from "../../utils/formateDate";

type notificationProps = {
  notification: INotification;
};

const NotificationItem = ({
  notification,
}: notificationProps) => {
  const [post, setPost] = useState<IPost>(null);
  const [user, setUser] = useState<IUser>(null);
  const [comments, setComments] = useState<IComment[]>();
  const [currentComment, setCurrentComment] = useState<IComment>(null);
  const getPost = useGetPost();
  const getUsers = useGetUsers();
  const getComments = useGetComments();

  const fetchData = async () => {
    try {
      const usersResult = await getUsers.mutateAsync();
      const user = usersResult.find((user) => user.id === notification.fromUserId);
      setUser(user);

      const postResult = await getPost.mutateAsync(notification.postId);
      setPost(postResult);
      const commentsResult = await getComments.mutateAsync(notification.postId);
      setComments(commentsResult);
      const currentComment = commentsResult.find((foundComment) => foundComment.id === notification.commentId);
      setCurrentComment(currentComment);
    } catch (error) {
      // error
    }
  }

  useEffect(() => {
    fetchData()
  }, [notification])

  if (!user || !notification) return;

  return (
    <article className="flex mb-6 items-start">
      <div className="relative mr-5 shrink-0">
        <img src={user.avatar || UserAvatar} alt="avatar" className="w-[35px] h-[35px] rounded-full object-cover"/>
        <div className="absolute -bottom-6 left-4 bg-white dark:bg-dark-black-3 p-2 rounded-full w-8 h-8">
          <img src={notification.type === 'comment' ? comment : like} alt="notification" />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm lg:text-lg text-dark-grey-2  lg:dark:text-dark-grey-2 lg:text-black/90">
          {user.username} <span className="text-xs lg:text-sm">{notification.type === 'like' ? 'liked your post' : notification.type === 'comment' ? 'commented on your post' : 'followed you'}</span>
        </h3>
        {currentComment && <p className="bg-grey-2 dark:bg-dark-black-3 rounded py-4 lg:py-[13px] px-[10px] lg:px-[14px] mt-2 font-normal text-xs">{currentComment.content}</p>}
        <h2 className="mt-2 font-semibold text-sm lg:text-lg text-dark-grey-2">{post?.title}</h2>
        <small className="mt-1 text-dark-grey-2 text-[10px] lg:text-black lg:text-sm lg:dark:text-dark-grey-2">{formatDate(notification.time, 'notification')}</small>
      </div>
    </article>
  );
};

export default NotificationItem;
