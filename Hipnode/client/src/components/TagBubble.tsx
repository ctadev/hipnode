import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Props = {
  tag: string;
};

const TagBubble = ({ tag }: Props) => {
  const [tagName, setTagName] = useState(null);
  useEffect(() => {
    try {
      const fetchTagName = async () => {
        const tagsData = await axios.get(
          `${import.meta.env.VITE_DEV_BACKEND_URL}/tags/${tag.tag_id}`,
        );
        setTagName(tagsData.data);
      };
      fetchTagName();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="capitalize bg-grey-1 dark:bg-dark-black-4 py-1 px-[10px] rounded-[20px] text-[9px] lg:text-[10px] text-dark-grey-3 dark:text-dark-grey-4">
      {tagName?.name}
    </div>
  );
};

export default TagBubble;
