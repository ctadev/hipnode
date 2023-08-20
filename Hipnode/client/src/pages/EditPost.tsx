import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import EditPosts from '../components/CreatePost/EditPosts';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const [preview, setPreview] = useState(false);
  const [covers, setCovers] = useState('');
  const [editor, setEditor] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('Post');
  const [group, setGroup] = useState<string>('');
  const [groupId, setGroupId] = useState();

  const { type, id } = useParams();

  const capitalized = type.charAt(0).toUpperCase() + type.slice(1);

  const { data, isLoading } = useQuery(
    [type, id],
    async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/${type}/${id}`,
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        setCovers(data.image_url);
        setEditor(data.content ? data.content : data.description);
        setTitle(data.title ? data.title : data.name);
      },
    },
  );

  // `${import.meta.env.VITE_DEV_BACKEND_URL}/posts/${post.id}/tags`;

  useEffect(() => {
    setCategory(capitalized);
  }, []);

  if (isLoading) {
    return <h1>Loading!!!</h1>;
  }

  return (
    <main className="bg-grey-2 text-black dark:text-white">
      <EditPosts
        title={title}
        setTitle={setTitle}
        preview={preview}
        setPreview={setPreview}
        covers={covers}
        setCovers={setCovers}
        editor={editor}
        setEditor={setEditor}
        tags={tags}
        setTags={setTags}
        category={category}
        setCategory={setCategory}
        group={group}
        setGroup={setGroup}
        groupId={groupId}
        setGroupId={setGroupId}
        data={data}
        type={type}
      />
    </main>
  );
};

export default EditPost;
