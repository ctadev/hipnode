import { close } from '../../assets/createpost-asset';

import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  tags: Array<string>;
  setTags?: Dispatch<SetStateAction<string[]>>;
}

const Tags = ({ tags, setTags }: Props) => {
  const addTag = (e) => {
    if (e.key === 'Enter') {
      setTags([...tags, e.target.value]);
      e.target.value = '';
    }
  };

  const removeTag = (indexs) => {
    setTags(tags.filter((item, index) => index !== indexs));
  };
  return (
    <main className="mt-4">
      <h1>
        Add or remove tags so readers know what your story is
        about.
      </h1>
      <div className="w-full flex gap-4 flex-wrap items-center mt-2">
        <ul className="flex gap-2 flex-wrap">
          {tags?.map((item, index) => (
            <li
              key={index}
              className="dark:bg-cyan-800 bg-dark-grey-2 flex gap-2 items-center justify-center rounded-md py-1 px-2"
            >
              <p>{item}</p>
              <img
                src={close as unknown as string}
                alt=""
                className="invert cursor-pointer w-[15px]"
                onClick={() => removeTag(index)}
              />
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyUp={addTag}
          placeholder="add a tag..."
          className="h-[46px] bg-transparent outline-none border-dark-grey-4 border w-full rounded-lg px-4"
        />
      </div>
    </main>
  );
};

export default Tags;
