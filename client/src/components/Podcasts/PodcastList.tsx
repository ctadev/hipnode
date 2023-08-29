import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

export default function PodcastList() {
  const { data, error, isLoading, isError } = useQuery({
    queryFn: async () => {
      try {
        const res = await axios.get('http:localhost:/8000/podcasts');
        return res.data; 
      }
      catch (err:any) {
        if ('response' in err && typeof err === "object") {
          throw new Error(err.response?.data?.message)
        }
      }
      
    },
  });
  return <div>PodcastList</div>;
}
