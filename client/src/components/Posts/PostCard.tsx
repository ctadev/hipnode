import React from 'react';
import UserHeader from '../User/UserHeader';

export default function PostCard({ post }) {
  const { id, title, content, image_url, user_id } = post;

  return (
    <article>
      <div className="h-[200px] w-[250px]">
        <img src={image_url} alt="" className="h-full w-full" />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        <span>{user_id}</span>

        <UserHeader user_id={user_id} />
      </div>
    </article>
  );
}
