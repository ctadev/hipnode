import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HashTags = ({ tag, style }) => {
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
    <p key={tag.tag_id} className={`${style}`}>
      #{tagName?.name} &nbsp;
    </p>
  );
};

export default HashTags;
