import React, { useState, useEffect } from 'react';

type Props = {
  viewCount: number;
  likeCount: number;
  commentCount: number;
  postId: number;
};

const PostMetrics = ({ viewCount, likeCount, commentCount, postId }: Props) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchCommentsByPostId = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/posts/${postId}/comments`,
      );
      const data = await response.json();
      setComments(data);
    };

    fetchCommentsByPostId();
  });
  return (
    <div className="flex gap-[30px] lg:gap-10 text-dark-grey-2 dark:text-dark-grey-4 text-[9px] lg:text-sm items-center mt-4 lg:md-0">
      <p>{viewCount} Views</p>
      <p>{likeCount} Likes</p>
      <p>{Array.isArray(comments) ? comments.length : 0} Comments</p>
    </div>
  );
};

export default PostMetrics;
