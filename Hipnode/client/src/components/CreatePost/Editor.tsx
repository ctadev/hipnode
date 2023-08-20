import React, { Dispatch, SetStateAction, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
  editor: string;
  setEditor?: Dispatch<SetStateAction<string>>;
}

const Editor = ({ editor, setEditor }: Props) => {

  const modules = {
    toolbar: [
      [{ header: '1' }],
      ['bold', 'italic', 'underline', 'strike', 'link', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
    ],
  };

  return (
    <main className="mt-8">
      <ReactQuill
        theme="snow"
        value={editor}
        onChange={setEditor}
        modules={modules}
      />
    </main>
  );
};

export default Editor;
