import React, { useState } from 'react';

import Posts from '../components/CreatePost/Posts';
import Preview from '../components/CreatePost/Preview';
import { Navbar } from '../components';

const CreatePost = () => {
  const [preview, setPreview] = useState(false);
  const [covers, setCover] = useState(null);
  const [editor, setEditor] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('Post');
  const [group, setGroup] = useState<string>('');
  const [groupId, setGroupId] = useState(345345);

  return (
    <>
      {preview ? (
        <>
          <main className="bg-grey-2 dark:bg-dark-black-2 dark:text-white">
            <Preview
              setPreview={setPreview}
              title={title}
              covers={covers}
              editor={editor}
              tags={tags}
            />
          </main>
        </>
      ) : (
        <>
          <main className="bg-grey-2 text-black dark:text-white">
            <Posts
              title={title}
              setTitle={setTitle}
              preview={preview}
              setPreview={setPreview}
              covers={covers}
              setCover={setCover}
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
            />
          </main>
        </>
      )}
    </>
  );
};

export default CreatePost;
